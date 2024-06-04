package com.example.springsecurityauthentication.dto;

import com.example.springsecurityauthentication.persistence.entity.UserRole;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EditUserResponseDTO {
    private Long id;
    private String email;
    private String firstname;
    private String userame;
    private String password;
    private UserRole role;

}
