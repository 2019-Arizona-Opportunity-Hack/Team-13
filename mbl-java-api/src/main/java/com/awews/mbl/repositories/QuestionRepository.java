package com.awews.mbl.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.awews.mbl.domain.Question;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long> {
	
	List<Question> findByUsFormNumberOrderByPartOfForm(String usFormNumber);
	
//	QuestionSequence = questionNumberPart-questionNumber
	Question findQuestionByQuestionSequence(String questionSequence);

}
