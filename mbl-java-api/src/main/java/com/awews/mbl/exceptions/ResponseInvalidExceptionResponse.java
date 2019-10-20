package com.awews.mbl.exceptions;

public class ResponseInvalidExceptionResponse {
	
	private String responseInvalid;
	
	public ResponseInvalidExceptionResponse(String responseInvalid) {
		
		this.responseInvalid = responseInvalid;
	}

	public String getResponseNotFound() {
		return responseInvalid;
	}

	public void setResponseInvalid(String responseNotFound) {
		responseInvalid = responseNotFound;
	}

}
