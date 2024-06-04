package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.GetAllUsersRequestDTO;
import com.example.springsecurityauthentication.dto.GetUsersResponseDTO;

public interface GetUsersUseCase {
    GetUsersResponseDTO getUsers(GetAllUsersRequestDTO requestDTO);
}
