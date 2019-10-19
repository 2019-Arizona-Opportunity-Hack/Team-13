package com.awews.mbl.web;

import java.security.Principal;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.awews.mbl.domain.Response;
import com.awews.mbl.domain.User;
import com.awews.mbl.services.MapValidationErrorService;
import com.awews.mbl.services.ResponseService;
import com.awews.mbl.services.UserService;

@RestController
@RequestMapping("/api/ver0001/us-form-number/{usFormNumber}/responses")
@CrossOrigin
public class ResponseController {
	
	@Autowired
	private ResponseService responseService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createResponse(@Valid @RequestBody Response response,
										BindingResult result, @PathVariable String usFormNumber, Principal principal){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Response newResponse = responseService.createResponse(response, principal.getName(), usFormNumber);
		
		return new ResponseEntity<Response>(newResponse, HttpStatus.CREATED);
	}
	
	@GetMapping("/{responseId}")
	public ResponseEntity<?> findById(@PathVariable String usFormNumber, @PathVariable Long responseId, Principal principal) {
		Response response = responseService.findById(usFormNumber, responseId, principal.getName());
		return new ResponseEntity<Response>(response, HttpStatus.OK);
	}
	
	@GetMapping("")
	public Iterable<Response> findResponsesByApplicationIdentifier(@PathVariable String usFormNumber, Principal principal){
		System.out.println("54");
		System.out.println(principal);
		String username = principal.getName();
		User user = userService.findByUsername(username);
		System.out.println("56");
//		Long userId = user.getId();
		String applicationIdentifier = (user.getId() +"-"+ usFormNumber).toUpperCase();
		return responseService.findResponsesByApplicationIdentifier(applicationIdentifier, usFormNumber, principal.getName());
	}
	
	@PostMapping("/{responseId}")
	public ResponseEntity<?> updateResponse(@Valid @RequestBody Response response,
										BindingResult result, @PathVariable Long responseId, @PathVariable String usFormNumber, Principal principal){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Response newResponse = responseService.updateResponse(response, responseId, principal.getName(), usFormNumber);
		
		return new ResponseEntity<Response>(newResponse, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{responseId}")
	public ResponseEntity<?> deleteResponse(@PathVariable Long responseId, @PathVariable String usFormNumber, Principal principal){
		responseService.deleteResponseById(responseId, principal.getName(), usFormNumber);
		
		return new ResponseEntity<String>("Response with ID: '"+responseId+"' was deleted", HttpStatus.OK);
	}

}
