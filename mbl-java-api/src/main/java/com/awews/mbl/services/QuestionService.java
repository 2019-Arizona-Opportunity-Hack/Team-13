package com.awews.mbl.services;

import com.awews.mbl.domain.Question;
import com.awews.mbl.domain.QuestionList;
import com.awews.mbl.domain.UsForm;
import com.awews.mbl.exceptions.UsFormNotFoundException;
import com.awews.mbl.repositories.QuestionListRepository;
import com.awews.mbl.repositories.QuestionRepository;
import com.awews.mbl.repositories.UsFormRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private UsFormRepository usFormRepository;
	
	@Autowired
	private QuestionListRepository questionListRepository;
	
	public Question addQuestion(String usFormNumber, Question question) {
		System.out.println("QuestionService line 30");
		System.out.println(question);
		
		try {
			QuestionList questionList = questionListRepository.findByUsFormNumber(usFormNumber.toUpperCase());
			
			question.setQuestionList(questionList);
			
			question.setUsFormNumber(usFormNumber.toUpperCase());
			
			question.setQuestionSequence((question.getUsFormNumber()+"-"+question.getQuestionNumberPart()+"-"+question.getQuestionNumber()).toUpperCase());
			
//			Q to be added to a specific form, form != null
//			Question newQuestion = questionRepository.findByUsFormNumber(usFormNumber);
//			set form to question
			return questionRepository.save(question);
		} catch (Exception e) {
			throw new UsFormNotFoundException("US Form '"+usFormNumber.toUpperCase()+"' NOT found");
		}
		
	}

	public Iterable<Question> findByUsFormNumber(String usFormNumber) {
		// TODO Auto-generated method stub
		UsForm usForm = usFormRepository.findByFormNumber(usFormNumber.toUpperCase());
		
		if(usForm == null) {
			throw new UsFormNotFoundException("US Form '"+usFormNumber.toUpperCase()+"' does NOT exist");
		}
		
		return questionRepository.findByUsFormNumberOrderByPartOfForm(usFormNumber);
	}
	
//	QuestionSequence = questionNumberPart-questionNumber
	public Question findQuestionByQuestionSequence(String usFormNumber, String questionSequence){
//		search the correct question-list
		QuestionList questionList = questionListRepository.findByUsFormNumber(usFormNumber.toUpperCase());
		
		if(questionList == null) {
			throw new UsFormNotFoundException("US Form with US Form Number'"+usFormNumber.toUpperCase()+"' does NOT exist");
		}
		
		Question question = questionRepository.findQuestionByQuestionSequence(questionSequence.toUpperCase());
		if(question == null) {
			throw new UsFormNotFoundException("Question Sequence '"+questionSequence.toUpperCase()+"' NOT found");
		}
		
		if(!question.getUsFormNumber().equals(usFormNumber)) {
			throw new UsFormNotFoundException("Question Sequence '"+questionSequence.toUpperCase()+"' NOT found on US Form '"+usFormNumber);
		}
		
//		Question question = questionRepository.findQuestionByQuestionSequence(usFormNumber, questionSequence);
		return question;
		
	}
	
	public Question updateByQuestionSequence(Question updatedQuestion, String usFormNumber, String questionSequence) {
		Question question = findQuestionByQuestionSequence(usFormNumber.toUpperCase(), questionSequence.toUpperCase());
		
		updatedQuestion.setQuestionSequence(questionSequence.toUpperCase());
		updatedQuestion.setUsFormNumber(usFormNumber.toUpperCase());
		
		question = updatedQuestion;
		
		return questionRepository.save(question);
	}
	
	public void deleteQuestionByQuestionSequence(String usFormNumber, String questionSequence) {
		System.out.println("QuestionService line 98");
		System.out.println(usFormNumber);
		System.out.println(questionSequence);
		Question question = findQuestionByQuestionSequence(usFormNumber, questionSequence);
		System.out.println("QuestionService line 101");
		System.out.println(question);
		questionRepository.delete(question);
	}

}
