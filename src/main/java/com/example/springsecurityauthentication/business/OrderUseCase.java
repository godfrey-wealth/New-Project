package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.CreateOrderRequestDTO;
import com.example.springsecurityauthentication.dto.CreateOrderResponseDTO;
import com.example.springsecurityauthentication.persistence.entity.ShoppingCart;

import java.util.List;

public interface OrderUseCase {

    // Get Customer Order by Id;


    public Double getCartAmount(List<ShoppingCart> shoppingCartList);

    CreateOrderResponseDTO createNewOrder(CreateOrderRequestDTO request);
}
