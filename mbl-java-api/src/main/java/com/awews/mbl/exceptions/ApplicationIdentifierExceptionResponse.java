package com.awews.mbl.exceptions;

public class ApplicationIdentifierExceptionResponse {
	
	private String applicationIdentifier;
	
	public ApplicationIdentifierExceptionResponse(String applicationIdentifier) {
		this.applicationIdentifier = applicationIdentifier;
	}

	public String getApplicationIdentifier() {
		return applicationIdentifier;
	}

	public void setApplicationIdentifier(String applicationIdentifier) {
		this.applicationIdentifier = applicationIdentifier;
	}

}
