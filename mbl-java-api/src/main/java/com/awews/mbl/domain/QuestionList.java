package com.awews.mbl.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class QuestionList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String usFormNumber;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="usFormId", nullable = false)
	@JsonIgnore
	private UsForm usForm;
	
	@OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "questionList", orphanRemoval = true)
	private List<Question> questions = new ArrayList<>();
	
	public QuestionList() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsFormNumber() {
		return usFormNumber;
	}

	public void setUsFormNumber(String usFormNumber) {
		this.usFormNumber = usFormNumber;
	}

	public UsForm getUsForm() {
		return usForm;
	}

	public void setUsForm(UsForm usForm) {
		this.usForm = usForm;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	

}
