package com.awews.mbl.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.awews.mbl.domain.Response;
import com.awews.mbl.domain.User;
import com.awews.mbl.exceptions.ApplicationIdentifierException;
import com.awews.mbl.exceptions.ResponseNotFoundException;
import com.awews.mbl.repositories.ResponseRepository;
import com.awews.mbl.repositories.UserRepository;

@Service
public class ResponseService {
	
	@Autowired
	private ResponseRepository responseRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Response createResponse(Response response, String username, String usFormNumber) {
		
		List<Response> responses = findResponsesByApplicationIdentifier(response.getApplicationIdentifier(), usFormNumber, username);
		
//		find a response with the same 'userFormQuestionResponse' and then update that response
//		userId-usFormNumber-questionNumberPart-questionNumber
		for(int i = 0; i < responses.size(); i++) {
//			System.out.println("line 31");
//			System.out.println(responses.get(i));
			if(responses.get(i).getUserFormQuestionResponse().equals(response.getUserFormQuestionResponse())) {
//				System.out.println("line 33");
//				System.out.println("responses.get(i)");
//				System.out.println(responses.get(i));
				Long responseId = responses.get(i).getId();
				response.setId(responseId);
//				System.out.println(response);
//				System.out.println("line 42");
				return updateResponse(response, responseId, username, usFormNumber);
			}
		}
		
		try {
			User user = userRepository.findByUsername(username);
//			System.out.println("ResponseService line 47");
//			System.out.println(response.getConfirmed());
			if(response.getConfirmed() == null) {
				response.setConfirmed(false);
			}
//			System.out.println(user);
//			System.out.println(user.getUsername());
			
			response.setUser(user);
			
			String applicationIdentifier = user.getId() +"-"+ usFormNumber;
			response.setUsFormNumber(usFormNumber.toUpperCase());
			response.setApplicationIdentifier(applicationIdentifier.toUpperCase());
			
//			System.out.println("ResponseService line 61");
//			System.out.println(response.getUser());
//			System.out.println(response.getUser().getUsername());
			
//			System.out.println("ResponseService line 65");
//			System.out.println(response);
			return responseRepository.save(response);
		} catch (Exception ex) {
			throw new ApplicationIdentifierException("Application ID '"+response.getApplicationIdentifier().toUpperCase()+"' already exists");
		}
	}
	
	public Response findById(String usFormNumber, Long responseId, String username){
		
		try {
			Response response = responseRepository.getById(responseId);
			
			
			
			if(response != null && (!response.getUser().getUsername().equals(username))) {
				throw new ResponseNotFoundException("Response not found in your account");
			} else if (response == null) {
				throw new ResponseNotFoundException("Response not found.");
			}
			
//			System.out.println("ResponseService line 86");
			
			return response;
		} catch (Exception ex) {
			throw new ResponseNotFoundException("Response with ID: '"+responseId+"' cannot be found");
		}
	}
	
	public List<Response>findResponsesByApplicationIdentifier(String applicationIdentifier, String usFormNumber, String username){
		
		try {
			return responseRepository.findByApplicationIdentifierOrderByQuestionSequence(applicationIdentifier);
			
		} catch (Exception ex) {
			throw new ApplicationIdentifierException("Responses with application ID '"+applicationIdentifier.toUpperCase()+"' NOT found");
		}
	}
	
	public Response updateResponse(Response response, Long responseId, String username, String usFormNumber) {

		if(response.getId() != null) {
			
			if(!response.getId().equals(responseId)) {
				throw new ResponseNotFoundException("The response was NOT updated because ID: '"+responseId+"' and the response.id '"+response.getId()+"' do NOT match");
			}
//			Response existingResponse = responseRepository.getById(responseId);
			Response existingResponse = findById(usFormNumber, responseId, username);
			
//			Response existingResponse = responseRepository.findByQuestionSequence(response.getQuestionSequence());
			if(existingResponse == null) {
				throw new ResponseNotFoundException("Response with ID: '"+responseId+"' cannot be updated because it doesn't exist");
			}
			
			if(!existingResponse.getQuestionSequence().equals(response.getQuestionSequence())) {
				throw new ResponseNotFoundException("Response with ID: '"+responseId+"' cannot be updated because response doesn't exist on your account");
			}
			if(!existingResponse.getApplicationIdentifier().equals(response.getApplicationIdentifier())) {
				throw new ResponseNotFoundException("Response with ID: '"+responseId+"' cannot be updated because it doesn't exist on your application");
			}
//			System.out.println("ResponseService line 91");
//			System.out.println(existingResponse);
			existingResponse = response;
			existingResponse.setUser(userRepository.findByUsername(username));
			return responseRepository.save(existingResponse);
		}
		throw new ResponseNotFoundException("Response with QuestionSequence: '"+response.getQuestionSequence()+"' cannot be updated because it doesn't exist");
		
	}
	
	public void deleteResponseById(Long responseId, String username, String usFormNumber) {
		Response existingResponse = responseRepository.getById(responseId);
		
//		System.out.println("ResponseService line 81");
//		System.out.println(existingResponse);
		
		if(existingResponse != null && (!existingResponse.getUser().getUsername().equals(username))) {
			throw new ResponseNotFoundException("Response not found in your account");
		} else if(existingResponse == null) {
			throw new ResponseNotFoundException("Response with ID: '"+responseId+"' cannot be updated because it doesn't exist");
		}
		
		responseRepository.delete(existingResponse);
	}

}