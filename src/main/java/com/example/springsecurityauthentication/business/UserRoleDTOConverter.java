package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.UserRoleDTO;
import com.example.springsecurityauthentication.persistence.entity.UserRole;

public final class UserRoleDTOConverter {
    UserRoleDTOConverter(){
    }

    public static UserRoleDTO convert(UserRole user){
                return  UserRoleDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        //.user(user.getUser())
                .build();

    }
}
