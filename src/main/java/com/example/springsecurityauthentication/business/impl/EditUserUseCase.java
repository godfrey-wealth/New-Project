package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.EditUserRequestDTO;

public interface EditUserUseCase {
    void editUser(EditUserRequestDTO request);
}
