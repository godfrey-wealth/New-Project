package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.UserDTO;
import com.example.springsecurityauthentication.dto.UserRoleDTO;
import com.example.springsecurityauthentication.persistence.entity.User;

import java.util.HashSet;
import java.util.Set;

public final class OrderUserDTOConverter {
    private OrderUserDTOConverter() {
    }

    public static UserDTO convertUserToDTO(User user) {
        Set<UserRoleDTO> roles = new HashSet<>();
        return UserDTO.builder().id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .build();


    }

}