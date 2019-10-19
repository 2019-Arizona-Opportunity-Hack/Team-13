package com.awews.mbl.exceptions;

public class MultipleChoiceInputException {
	
	private String clashedInput;
	
	public MultipleChoiceInputException(String clashingInputsMessages) {
		
		clashedInput = clashingInputsMessages;
	}

	public String getMultipleChoiceException() {
		return clashedInput;
	}

	public void setMultipleChoiceInputException(String clashingInputsMessages) {
		clashedInput = clashingInputsMessages;
	}

}