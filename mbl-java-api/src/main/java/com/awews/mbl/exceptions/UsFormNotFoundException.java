package com.awews.mbl.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsFormNotFoundException extends RuntimeException {
	public UsFormNotFoundException(String message) {
		super(message);
	}

}
