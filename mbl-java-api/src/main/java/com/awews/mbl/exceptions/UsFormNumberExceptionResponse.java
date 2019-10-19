package com.awews.mbl.exceptions;

public class UsFormNumberExceptionResponse {
	
	private String usFormNumber;
	
	public UsFormNumberExceptionResponse(String usFormNumber) {
		this.usFormNumber = usFormNumber;
	}

	public String getUsFormNumber() {
		return usFormNumber;
	}

	public void setUsFormNumber(String usFormNumber) {
		this.usFormNumber = usFormNumber;
	}

}
