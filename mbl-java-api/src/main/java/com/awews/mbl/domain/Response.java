//Changed "spanishText" to "translationText" to make the code more flexible for other languages

package com.awews.mbl.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Response {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;
	
//	userId-usFormNumber
	private String applicationIdentifier;
//	same as on question, must be unique for user
//	usFormNumber-questionNumberPart-questionNumber
	private String questionSequence;
	
//	must be unique: userId-usFormNumber-questionNumberPart-questionNumber
	private String userFormQuestionResponse;
	
	private String translationText;

	private String validationRule; // To help in inputs validation
	
//	@Value
	@Column(columnDefinition = "bool default false")
	private Boolean confirmed;
	
	private String usFormNumber;
	
//	@NotBlank(message = "X Placement is required")
	private String xPlacement;
//	@NotBlank(message = "Y Placement is required")
	private String yPlacement;
//	@NotBlank(message = "Page on Form is required")
	private int pageOnForm;

	@NotBlank(message = "responseText es requerido")
	private String responseText;
//	subId-applicationIdentifier, may NOT be necessary
	private String submissionIdentifier;
	
	public Response() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getApplicationIdentifier() {
		return applicationIdentifier;
	}

	public void setApplicationIdentifier(String applicationIdentifier) {
		this.applicationIdentifier = applicationIdentifier;
	}

	public String getQuestionSequence() {
		return questionSequence;
	}

	public void setQuestionSequence(String questionSequence) {
		this.questionSequence = questionSequence;
	}

	public String getUsFormNumber() {
		return usFormNumber;
	}

	public void setUsFormNumber(String usFormNumber) {
		this.usFormNumber = usFormNumber;
	}

	public String getResponseText() {
		return responseText;
	}

	public void setResponseText(String responseText) {
		this.responseText = responseText;
	}

	public String getSubmissionIdentifier() {
		return submissionIdentifier;
	}

	public void setSubmissionIdentifier(String submissionIdentifier) {
		this.submissionIdentifier = submissionIdentifier;
	}

	public String getxPlacement() {
		return xPlacement;
	}

	public void setxPlacement(String xPlacement) {
		this.xPlacement = xPlacement;
	}

	public String getyPlacement() {
		return yPlacement;
	}

	public void setyPlacement(String yPlacement) {
		this.yPlacement = yPlacement;
	}

	public int getPageOnForm() {
		return pageOnForm;
	}

	public void setPageOnForm(int pageOnForm) {
		this.pageOnForm = pageOnForm;
	}

	public String gettranslationText() {
		return translationText;
	}

	public void settranslationText(String translationText) {
		this.translationText = translationText;
	}

	public Boolean getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
	}

	public String getUserFormQuestionResponse() {
		return userFormQuestionResponse;
	}

	public void setUserFormQuestionResponse(String userFormQuestionResponse) {
		this.userFormQuestionResponse = userFormQuestionResponse;
	}

	/** 
	 * Additional methods to help in inputs validation
	 */
	public String getValidationRule() {
		return validationRule;
	}

	public void setValidationRule(String rule) {
		validationRule = rule;
	}

	// End of additional methods

	@Override
	public String toString() {
		return "Response [id=" + id + ", user=" + user + ", applicationIdentifier=" + applicationIdentifier
				+ ", questionSequence=" + questionSequence + ", userFormQuestionResponse=" + userFormQuestionResponse
				+ ", translationText=" + translationText + ", confirmed=" + confirmed + ", usFormNumber=" + usFormNumber
				+ ", xPlacement=" + xPlacement + ", yPlacement=" + yPlacement + ", pageOnForm=" + pageOnForm
				+ ", responseText=" + responseText + ", submissionIdentifier=" + submissionIdentifier 
				+ ", validationRule=" + validationRule + "]";
	}

}
