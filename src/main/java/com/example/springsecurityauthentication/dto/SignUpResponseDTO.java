package com.example.springsecurityauthentication.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SignUpResponseDTO {
   // private String response;
   private Long userId;
}
