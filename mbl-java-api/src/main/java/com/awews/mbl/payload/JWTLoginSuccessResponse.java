package com.awews.mbl.payload;

public class JWTLoginSuccessResponse {
	
	private boolean success;
	private String token;
	
	public JWTLoginSuccessResponse(boolean success, String token) {
		this.success = success;
		this.token = token;
	}
	
	public boolean isSuccess() {
		return success;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	@Override
	public String toString() {
		return "JWTLoginSuccessResponse [success=" + success + ", token=" + token + "]";
	}

}
