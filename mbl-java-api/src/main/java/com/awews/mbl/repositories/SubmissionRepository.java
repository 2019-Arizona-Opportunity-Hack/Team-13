package com.awews.mbl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.awews.mbl.domain.Submission;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
	
	Submission getById(Long id);
	
	Submission getByFileName(String fileName);

}
