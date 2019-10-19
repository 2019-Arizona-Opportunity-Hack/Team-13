package com.awews.mbl.exceptions;

public class UsFormNameExceptionResponse {
	
	private String usFormName;
	
	public UsFormNameExceptionResponse(String usFormName) {
		this.usFormName = usFormName;
	}

	public String getUsFormName() {
		return usFormName;
	}

	public void setUsFormName(String usFormName) {
		this.usFormName = usFormName;
	}

}
