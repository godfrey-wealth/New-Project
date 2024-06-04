package com.example.springsecurityauthentication.configuration.exception;

public class ProductNotFoundWithThatIDException extends RuntimeException{

    public ProductNotFoundWithThatIDException(Long id){
        super("Product with that particular  Product-Id does not Exist :" + id);
    }
}
