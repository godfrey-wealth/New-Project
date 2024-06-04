package com.example.springsecurityauthentication.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {

    private Long payId;
}
