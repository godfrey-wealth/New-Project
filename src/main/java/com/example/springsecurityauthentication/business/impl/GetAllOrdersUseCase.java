package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.GetAllOrdersRequestDTO;
import com.example.springsecurityauthentication.dto.GetOrdersResponseDTO;

public interface GetAllOrdersUseCase {
    GetOrdersResponseDTO getOrders(GetAllOrdersRequestDTO requestDTO);
}
