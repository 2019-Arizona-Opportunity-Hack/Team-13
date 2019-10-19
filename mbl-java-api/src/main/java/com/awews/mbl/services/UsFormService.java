package com.awews.mbl.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.awews.mbl.domain.QuestionList;
import com.awews.mbl.domain.UsForm;
import com.awews.mbl.exceptions.UsFormNumberException;
import com.awews.mbl.repositories.QuestionListRepository;
import com.awews.mbl.repositories.UsFormRepository;

@Service
public class UsFormService {
	
	@Autowired
	private UsFormRepository usFormRepository;
	
	@Autowired
	private QuestionListRepository questionListRepository;
	
	public UsForm saveOrUpdateUsForm(UsForm usForm) {
		
		try {
			usForm.setFormNumber(usForm.getFormNumber().toUpperCase());
			usForm.setFormName(usForm.getFormName().toUpperCase());
			
			if(usForm.getId() == null) {
				QuestionList questionList = new QuestionList();
				usForm.setQuestionList(questionList);
				questionList.setUsForm(usForm);
				questionList.setUsFormNumber(usForm.getFormNumber().toUpperCase());
			}
			
			if(usForm.getId() != null) {
				usForm.setQuestionList(questionListRepository.findByUsFormNumber(usForm.getFormNumber().toUpperCase()));
			}
			
			return usFormRepository.save(usForm);
		} catch(Exception e) {
			throw new UsFormNumberException("US Form Number '"+usForm.getFormNumber().toUpperCase()+"' already exists.");
		}
	}
	
	public UsForm findUsFormByFormNumber(String usFormNumber) {
		
		UsForm usForm = usFormRepository.findByFormNumber(usFormNumber.toUpperCase());
		
		if(usForm == null) {
			throw new UsFormNumberException("US Form Number '"+usFormNumber.toUpperCase()+"' does NOT exists.");
		}
		
		return usForm;
	}
	
	public Iterable<UsForm> findAllUsForms(){
				
		return usFormRepository.findAll();
	}
	
	public void deleteUsFormByFormNumber(String usFormNumber) {
		UsForm usForm = findUsFormByFormNumber(usFormNumber.toUpperCase());
		
		if(usForm == null) {
			throw new UsFormNumberException("US Form Number NOT deleted because '"+usFormNumber.toUpperCase()+"' does NOT exists.");
		}
		
		usFormRepository.delete(usForm);
		
		
	}

}
