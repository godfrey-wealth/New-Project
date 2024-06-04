package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.config.exception.userNotFoundException;
import com.example.springsecurityauthentication.dto.UserDTO;

import java.util.Optional;

public interface GetUserUseCase {
    Optional<UserDTO> getUser(Long Id) throws userNotFoundException;




}
