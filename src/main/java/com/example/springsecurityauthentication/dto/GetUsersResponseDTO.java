package com.example.springsecurityauthentication.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class GetUsersResponseDTO {
    private List<UserDTO> users;
}
