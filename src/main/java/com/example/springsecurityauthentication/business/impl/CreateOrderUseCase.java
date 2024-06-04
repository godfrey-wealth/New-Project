package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.CreateOrderRequestDTO;
import com.example.springsecurityauthentication.dto.CreateOrderResponseDTO;

public interface CreateOrderUseCase {
    CreateOrderResponseDTO createNewOrder(CreateOrderRequestDTO request);
}
