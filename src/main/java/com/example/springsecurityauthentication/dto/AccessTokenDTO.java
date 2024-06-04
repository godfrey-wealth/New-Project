package com.example.springsecurityauthentication.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.List;

@Builder
//@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccessTokenDTO {
    private String subject;
    private List<String> roles;
    private Long userId;

    @JsonIgnore
    public boolean hasRole(String roleName) {
        if (roles == null) {
            return false;
        }
        return roles.contains(roleName);
    }
}
