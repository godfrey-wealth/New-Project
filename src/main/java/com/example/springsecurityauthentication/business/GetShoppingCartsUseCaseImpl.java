package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.GetShoppingCartsRequestDTO;
import com.example.springsecurityauthentication.dto.GetShoppingCartsResponseDTO;
import com.example.springsecurityauthentication.dto.ShoppingCartDTO;
import com.example.springsecurityauthentication.persistence.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetShoppingCartsUseCaseImpl implements GetShoppingCartsUseCase {
    private final ShoppingCartRepository shoppingCartRepository;

//    @Override
//    public GetUsersResponseDTO getUsers() {
//        return null;
//    }

    @Override
    public GetShoppingCartsResponseDTO getCartItems(GetShoppingCartsRequestDTO requestDTO) {


        List<ShoppingCartDTO> CartItems = shoppingCartRepository.findAll()
                .stream()
                .map(ShoppingCartDTOConverter::convertShoppingToDTO)
                .toList();

        return GetShoppingCartsResponseDTO.builder().cartItems(CartItems).build();
    }
}
