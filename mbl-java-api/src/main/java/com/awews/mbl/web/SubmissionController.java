package com.awews.mbl.web;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.awews.mbl.domain.Response;
import com.awews.mbl.domain.Submission;
import com.awews.mbl.services.ResponseService;
import com.awews.mbl.services.SubmissionService;

@RestController
@RequestMapping("/api/ver0001/")
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class SubmissionController {
	
	@Autowired
	private SubmissionService submissionService;
	
	@Autowired
	private ResponseService responseService;
	
	@GetMapping("/my-form")
	public ResponseEntity<?> getMyForm(@PathVariable Long userId, Principal principal) throws InvalidPasswordException, IOException {
		System.out.println(userId);
		String usFormNumber = "i-90";
		String applicationIdentifier = (userId +"-"+usFormNumber).toUpperCase();
		
		List<Response> responses = responseService.findResponsesByApplicationIdentifier(applicationIdentifier, usFormNumber, principal.getName());
		
		Submission submission = submissionService.getPdf(responses);
		
		HttpHeaders header = new HttpHeaders();
		
		header.setContentType(MediaType.valueOf(submission.getContentType()));
		header.setContentLength(submission.getData().length);
		header.set("Content-Disposition", "attachment; filename=" + submission.getFileName());

		System.out.println("header");
		System.out.println(header);
		
		return new ResponseEntity<>(submission.getData(), header, HttpStatus.OK);
		
	}
	
	@GetMapping("/{submissionId}")
	public ResponseEntity<?> getFormById(@PathVariable Long userId, @PathVariable String submissionId, Principal principal) {
		String usFormNumber = "i-90";
		String applicationIdentifier = (userId +"-"+usFormNumber).toUpperCase();
		
		Long submissionIdLong = Long.parseLong(submissionId);
		
		Submission submission = submissionService.getFormById(userId, applicationIdentifier, submissionIdLong);
		
		HttpHeaders header = new HttpHeaders();
		
		header.setContentType(MediaType.valueOf(submission.getContentType()));
		header.setContentLength(submission.getData().length);
		header.set("Content-Disposition", "attachment; filename=" + submission.getFileName());
		
		return new ResponseEntity<>(submission.getData(), header, HttpStatus.OK);
	}

}
