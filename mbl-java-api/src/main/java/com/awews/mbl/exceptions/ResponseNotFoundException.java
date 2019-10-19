package com.awews.mbl.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ResponseNotFoundException extends RuntimeException {
	
	public ResponseNotFoundException(String message) {
		super(message);
	}

}
