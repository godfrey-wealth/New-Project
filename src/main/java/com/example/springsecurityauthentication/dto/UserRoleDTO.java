package com.example.springsecurityauthentication.dto;


import com.example.springsecurityauthentication.persistence.entity.RoleEnum;
import com.example.springsecurityauthentication.persistence.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserRoleDTO {


    private Long id;

    @NotNull

    @Enumerated(EnumType.STRING)
    private RoleEnum name;


    private User user;
}

