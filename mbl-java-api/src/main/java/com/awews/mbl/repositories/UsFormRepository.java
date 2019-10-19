package com.awews.mbl.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.awews.mbl.domain.UsForm;

@Repository
public interface UsFormRepository extends CrudRepository<UsForm, Long> {
	
	UsForm findByFormNumber(String usFormNumber);
	
	@Override
	Iterable<UsForm> findAll();

}
