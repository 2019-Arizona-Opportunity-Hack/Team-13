package com.awews.mbl.exceptions;

public class ResponseInvalidExceptionResponse {
	
	private String ResponseNotFound;
	
	public ResponseInvalidExceptionResponse(String responseNotFound) {
		
		ResponseNotFound = responseNotFound;
	}

	public String getResponseNotFound() {
		return ResponseNotFound;
	}

	public void setResponseNotFound(String responseNotFound) {
		ResponseNotFound = responseNotFound;
	}

}
