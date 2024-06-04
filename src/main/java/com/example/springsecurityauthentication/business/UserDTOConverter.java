package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.UserDTO;
import com.example.springsecurityauthentication.dto.UserRoleDTO;
import com.example.springsecurityauthentication.persistence.entity.User;

import java.util.HashSet;
import java.util.Set;

public final class UserDTOConverter {
    private UserDTOConverter() {
    }

    public static UserDTO convertUserToDTO(User user) {
        Set<UserRoleDTO> roles = new HashSet<>();
        return UserDTO.builder().id(user.getId()).email(user.getEmail()).firstname(user.getFirstname()).lastname(user.getLastname())
                .username(user.getUsername())
               // .role((UserRoleDTO) user.getUserRoles())
                .build();


    }

}