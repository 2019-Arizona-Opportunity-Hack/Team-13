package com.awews.mbl.exceptions;

public class InputFormatException extends RuntimeException{

	public InputFormatException(String validationRule) {
		super("Please make sure that your answer is in the right formatting: "
		+ validationRule);
	}
}