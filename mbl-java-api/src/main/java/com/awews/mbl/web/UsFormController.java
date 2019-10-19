package com.awews.mbl.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.awews.mbl.domain.UsForm;
import com.awews.mbl.services.MapValidationErrorService;
import com.awews.mbl.services.UsFormService;

@RestController
@RequestMapping("/api/ver0001/us-forms")
@CrossOrigin
public class UsFormController {
	
	@Autowired
	private UsFormService usFormService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewUsForm(@Valid @RequestBody UsForm usForm, BindingResult result){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		
		if(errorMap != null) return errorMap;
		
		
		UsForm newUsForm = usFormService.saveOrUpdateUsForm(usForm);
		return new ResponseEntity<UsForm>(newUsForm, HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{usFormNumber}")
	public ResponseEntity<?> getUsFormByFormNumber(@PathVariable String usFormNumber){
		
		UsForm usForm = usFormService.findUsFormByFormNumber(usFormNumber);
		
		return new ResponseEntity<UsForm>(usForm, HttpStatus.OK);
	}
	
	@GetMapping("")
	public Iterable<?>  findAllUsForms(){
		
		return usFormService.findAllUsForms();
	}
	
	@DeleteMapping("/{usFormNumber}")
	public ResponseEntity<?> deleteUsForm(@PathVariable String usFormNumber){
		usFormService.deleteUsFormByFormNumber(usFormNumber);
		return new ResponseEntity<String>("US Form with Form Number: '"+usFormNumber.toUpperCase()+"' was deleted", HttpStatus.OK);
	}

}
