package com.example.springsecurityauthentication.config.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserAlreadyExistsException extends ResponseStatusException {
    public UserAlreadyExistsException() {
        super(HttpStatus.BAD_REQUEST, "PAYMENT_ALREADY_EXISTS");
    }
}
