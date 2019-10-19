package com.awews.mbl.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.awews.mbl.domain.QuestionList;

@Repository
public interface QuestionListRepository extends CrudRepository<QuestionList, Long> {
	
	QuestionList findByUsFormNumber(String UsFormNumber);

}
