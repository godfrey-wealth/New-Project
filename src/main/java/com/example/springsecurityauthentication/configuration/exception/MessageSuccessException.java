package com.example.springsecurityauthentication.configuration.exception;

public class MessageSuccessException extends RuntimeException {

    public MessageSuccessException(Long Id){
        super( "Product with that Particular ID:- "+Id+": has been deleted Successfully");
    }
}
