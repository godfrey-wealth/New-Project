package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.GetShoppingCartsRequestDTO;
import com.example.springsecurityauthentication.dto.GetShoppingCartsResponseDTO;

public interface GetShoppingCartsUseCase {
    GetShoppingCartsResponseDTO getCartItems(GetShoppingCartsRequestDTO requestDTO);
}
