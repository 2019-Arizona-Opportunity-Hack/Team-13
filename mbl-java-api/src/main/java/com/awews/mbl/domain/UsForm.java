package com.awews.mbl.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class UsForm {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "US Form Name is required")
	@Column(updatable = false/*, unique = true*/)
	private String formName;
	@NotBlank(message = "US Form Number is required")
	@Column(updatable = false, unique = true)
	private String formNumber;
	@NotBlank(message = "Form Location is required")
//	@Column(/*updatable = false, unique = true*/)
	private String formLocation;
	@NotBlank(message = "Form Description is required")
	private String formDescription;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "usForm")
	private QuestionList questionList;
	
	public UsForm() {
		
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getFormName() {
		return formName;
	}


	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getFormNumber() {
		return formNumber;
	}

	public void setFormNumber(String formNumber) {
		this.formNumber = formNumber;
	}

	public String getFormLocation() {
		return formLocation;
	}


	public void setFormLocation(String formLocation) {
		this.formLocation = formLocation;
	}


	public String getFormDescription() {
		return formDescription;
	}


	public void setFormDescription(String formDescription) {
		this.formDescription = formDescription;
	}


	public QuestionList getQuestionList() {
		return questionList;
	}


	public void setQuestionList(QuestionList questionList) {
		this.questionList = questionList;
	}

}
