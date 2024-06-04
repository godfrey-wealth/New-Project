package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.LoginRequestDTO;
import com.example.springsecurityauthentication.dto.LoginResponseDTO;

public interface LoginUseCase {
    LoginResponseDTO login(LoginRequestDTO request);
}
