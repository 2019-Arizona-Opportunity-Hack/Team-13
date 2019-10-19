package com.awews.mbl.exceptions;

public class TextInputException {
	
	private String inputFormatError;
	
	public TextInputException(String inputFormatErrorMessage) {
		
		inputFormatError = inputFormatErrorMessage;
	}

	public String getMultipleChoiceException() {
		return inputFormatError;
	}

	public void setMultipleChoiceInputException(String inputFormatErrorMessage) {
		inputFormatError = inputFormatErrorMessage;
    }

}