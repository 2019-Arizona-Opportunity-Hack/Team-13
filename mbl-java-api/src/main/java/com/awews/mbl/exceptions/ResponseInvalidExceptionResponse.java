package com.awews.mbl.exceptions;

public class ResponseInvalidExceptionResponse {
	
	private String responseInvalid;
	
	public ResponseInvalidExceptionResponse(String responseInvalid) {
		
		this.responseInvalid = responseInvalid;
	}

	public String getResponseInvalid() {
		return responseInvalid;
	}

	public void setResponseInvalid(String responseInvalid) {
		this.responseInvalid = responseInvalid;
	}

}
