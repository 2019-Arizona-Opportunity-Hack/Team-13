package com.awews.mbl.exceptions;

public class UsFormNotFoundExceptionResponse {
	
	private String UsFormNotFound;
	
	public UsFormNotFoundExceptionResponse(String usFormNotFound) {
		UsFormNotFound = usFormNotFound;
	}

	public String getUsFormNotFound() {
		return UsFormNotFound;
	}

	public void setUsFormNotFound(String usFormNotFound) {
		UsFormNotFound = usFormNotFound;
	}

}
