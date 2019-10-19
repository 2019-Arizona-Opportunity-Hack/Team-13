package com.awews.mbl.exceptions;

public class RadioInputException {
	
	private String noInput;
	
	public RadioInputException() {
		
		noInput = "There is no option selected.";
	}

	public String getRadioException() {
		return noInput;
	}

	public void setRadioException(String noInputMessage) {
		noInput = noInputMessage;
	}

}