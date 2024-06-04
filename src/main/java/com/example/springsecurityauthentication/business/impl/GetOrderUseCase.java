package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.OrderDTO;

import java.util.Optional;

public interface GetOrderUseCase {

    public Optional<OrderDTO> getOrderDetail(Long orderId);
}
