package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.configuration.exception.InvalidUserException;

public interface UserIdValidator {
    void validateId(Long countryId) throws InvalidUserException;
}
