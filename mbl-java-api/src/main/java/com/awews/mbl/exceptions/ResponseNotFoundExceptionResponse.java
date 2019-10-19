package com.awews.mbl.exceptions;

public class ResponseNotFoundExceptionResponse {
	
	private String ResponseNotFound;
	
	public ResponseNotFoundExceptionResponse(String responseNotFound) {
		
		ResponseNotFound = responseNotFound;
	}

	public String getResponseNotFound() {
		return ResponseNotFound;
	}

	public void setResponseNotFound(String responseNotFound) {
		ResponseNotFound = responseNotFound;
	}

}
