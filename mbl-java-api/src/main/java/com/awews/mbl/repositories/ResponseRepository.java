package com.awews.mbl.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.awews.mbl.domain.Response;

@Repository
public interface ResponseRepository extends CrudRepository<Response, Long> {
	
	Response findByQuestionSequence(String questionSequence);
	List<Response> findByApplicationIdentifier(String applicationIdentifier);
	Response getById(Long id);
	List<Response> findByApplicationIdentifierOrderByQuestionSequence(String applicationIdentifier);

}
