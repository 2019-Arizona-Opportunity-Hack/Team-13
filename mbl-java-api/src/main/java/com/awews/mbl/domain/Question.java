//Changed "spanishText" to "translationText" to allow translations from other languages
package com.awews.mbl.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Question {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
//	@NotBlank(message = "Question Text is required")
	private String questionText;
	private String questionInfo;
//	@NotBlank(message = "X Placement is required")
	private String xPlacement;
//	@NotBlank(message = "Y Placement is required")
	private String yPlacement;
//	@NotBlank(message = "Page on Form is required")
	private Long pageOnForm;
//	@NotBlank(message = "Part on Form is required")
	private String partOfForm;
//	@NotBlank(message = "Question Number is required")
	private String questionNumber;
//	@NotBlank(message = "Question Number Part is required")
	private String questionNumberPart;
	
	private String special;
	
	private String translationText;
	
	private String responseText;

	private String questionType;

	private String validationRule; // To help in inputs validation
	
//	@NotBlank(message = "Question Sequence Part is required")
	@Column(updatable = false, unique = true)
	private String questionSequence;
	
//	ManyToOne with Form
//	columnDefinition = "int default 100") 
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="questionList_id", updatable = false, nullable = false, columnDefinition = "int default 1")
	@JsonIgnore
	private QuestionList questionList;
	
	@Column(updatable = false)
	private String usFormNumber;

	public Question() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
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

	public Long getPageOnForm() {
		return pageOnForm;
	}

	public void setPageOnForm(Long pageOnForm) {
		this.pageOnForm = pageOnForm;
	}

	public String getPartOfForm() {
		return partOfForm;
	}

	public void setPartOfForm(String partOfForm) {
		this.partOfForm = partOfForm;
	}

	public String getQuestionNumber() {
		return questionNumber;
	}

	public void setQuestionNumber(String questionNumber) {
		this.questionNumber = questionNumber;
	}

	public String getQuestionNumberPart() {
		return questionNumberPart;
	}

	public void setQuestionNumberPart(String questionNumberPart) {
		this.questionNumberPart = questionNumberPart;
	}
	
	public String getQuestionInfo() {
		return questionInfo;
	}

	public void setQuestionInfo(String questionInfo) {
		this.questionInfo = questionInfo;
	}

	public String getUsFormNumber() {
		return usFormNumber;
	}

	public void setUsFormNumber(String usFormNumber) {
		this.usFormNumber = usFormNumber;
	}

	public QuestionList getQuestionList() {
		return questionList;
	}

	public void setQuestionList(QuestionList questionList) {
		this.questionList = questionList;
	}

	public String getQuestionSequence() {
		return questionSequence;
	}

	public void setQuestionSequence(String questionSequence) {
		this.questionSequence = questionSequence;
	}

	public String getSpecial() {
		return special;
	}

	public void setSpecial(String special) {
		this.special = special;
	}

	public String gettranslationText() {
		return translationText;
	}

	public void settranslationText(String translationText) {
		this.translationText = translationText;
	}

	public String getQuestionType() {
		return questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getResponseText() {
		return responseText;
	}

	public void setResponseText(String responseText) {
		this.responseText = responseText;
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
		return "Question [id=" + id + ", questionText=" + questionText + ", questionInfo=" + questionInfo
				+ ", xPlacement=" + xPlacement + ", yPlacement=" + yPlacement + ", pageOnForm=" + pageOnForm
				+ ", partOfForm=" + partOfForm + ", questionNumber=" + questionNumber + ", questionNumberPart="
				+ questionNumberPart + ", special=" + special + ", translationText=" + translationText + ", questionType="
				+ questionType + ", responseText=" + responseText + ", questionSequence=" + questionSequence
				+ ", questionList=" + questionList + ", usFormNumber=" + usFormNumber + "]";
	}

}
