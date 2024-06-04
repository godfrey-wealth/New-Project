package com.example.springsecurityauthentication.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAllOrdersRequestDTO {
   // private String description;

    private List<OrderDTO> orders;
}
