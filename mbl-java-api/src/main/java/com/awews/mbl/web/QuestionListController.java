package com.awews.mbl.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.validation.Valid;

import com.awews.mbl.domain.Question;
import com.awews.mbl.services.MapValidationErrorService;
import com.awews.mbl.services.QuestionService;

@RestController
@RequestMapping("/api/ver0001/question-list")
@CrossOrigin
public class QuestionListController {
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{usFormNumber}")
	public ResponseEntity<?> addQuestionToQuestionList(@Valid @RequestBody Question question,
														BindingResult result, @PathVariable String usFormNumber){
		System.out.println("QuestionListController line 31");
		System.out.println(usFormNumber);
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Question newQuestion = questionService.addQuestion(usFormNumber, question);
		
		return new ResponseEntity<Question>(newQuestion, HttpStatus.CREATED);
	}
	
	@GetMapping("/{usFormNumber}")
	public Iterable<Question> getQuestionList(@PathVariable String usFormNumber){
		return questionService.findByUsFormNumber(usFormNumber);
	}
	
	@GetMapping("/{usFormNumber}/question-sequence/{questionSequence}")
	public ResponseEntity<?> findQuestionByQuestionSequence(@PathVariable String usFormNumber, @PathVariable String questionSequence) {
		Question question = questionService.findQuestionByQuestionSequence(usFormNumber, questionSequence);
		return new ResponseEntity<Question>(question, HttpStatus.OK);
	}
	
	@PatchMapping("/{usFormNumber}/question-sequence/{questionSequence}")
	public ResponseEntity<?> updateQuestion(@Valid @RequestBody Question question, BindingResult result,
												@PathVariable String usFormNumber, @PathVariable String questionSequence){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Question updatedQuestion = questionService.updateByQuestionSequence(question, usFormNumber, questionSequence);
		
		return new ResponseEntity<Question>(updatedQuestion, HttpStatus.OK);
	}
	
	@DeleteMapping("/{usFormNumber}/question-sequence/{questionSequence}")
	public ResponseEntity<?> deleteQuestion(@PathVariable String usFormNumber, @PathVariable String questionSequence){
		questionService.deleteQuestionByQuestionSequence(usFormNumber, questionSequence);
		return new ResponseEntity<String>("Question '"+questionSequence+"' was deleted successfully", HttpStatus.OK);
	}

}
