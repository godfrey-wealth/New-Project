package com.example.springsecurityauthentication.business.impl;

import com.example.springsecurityauthentication.dto.PaymentRequestDTO;
import com.example.springsecurityauthentication.dto.PaymentResponse;

public interface PaymentUseCase {

    PaymentResponse processPayment(PaymentRequestDTO paymentRequestDTO);
}
