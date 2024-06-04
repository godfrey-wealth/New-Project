package com.example.springsecurityauthentication.config.exception;

public class UserNotFoundWithIDException extends Exception {
    public UserNotFoundWithIDException(String message) {
        super(message);
    }
}
