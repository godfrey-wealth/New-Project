package com.example.springsecurityauthentication.configuration.exception;



public class InvalidPaymentException extends RuntimeException {
    public InvalidPaymentException(String message) {
        super(message);
    }
}
