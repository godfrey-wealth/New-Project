package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.config.exception.ProductNotFoundWithThatIDException;
import com.example.springsecurityauthentication.dto.ProductDTO;

import java.util.Optional;

public interface GetProductUseCase {
    Optional<ProductDTO> getProduct(Long id) throws ProductNotFoundWithThatIDException;
}
