package com.example.springsecurityauthentication.configuration.exception;

public class UserNotFoundWithIDException extends Exception {
    public UserNotFoundWithIDException(String message) {
        super(message);
    }
}
