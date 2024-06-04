package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.SignUpRequestDTO;
import com.example.springsecurityauthentication.dto.SignUpResponseDTO;

public interface SignUpUseCase {
    SignUpResponseDTO signUp(SignUpRequestDTO request);
}
