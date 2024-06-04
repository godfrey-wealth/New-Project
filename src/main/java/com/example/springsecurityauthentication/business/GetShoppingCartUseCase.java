package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.config.exception.userNotFoundException;
import com.example.springsecurityauthentication.dto.ShoppingCartDTO;

import java.util.Optional;

public interface GetShoppingCartUseCase {

    public Optional<ShoppingCartDTO> getShoppingCart(Long Id) throws userNotFoundException;
}
