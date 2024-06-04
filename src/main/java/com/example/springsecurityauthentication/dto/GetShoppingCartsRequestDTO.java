package com.example.springsecurityauthentication.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetShoppingCartsRequestDTO {
    private String cartname;
}
