package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.GetAllProductsUseCase;
import com.example.springsecurityauthentication.dto.GetProductsResponseDTO;
import com.example.springsecurityauthentication.dto.ProductDTO;
import com.example.springsecurityauthentication.persistence.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetProductsUseCaseImpl implements GetAllProductsUseCase {
    private final ProductRepository productRepository;

    @Override
    public GetProductsResponseDTO getProducts() {
        List<ProductDTO> products = productRepository.findAll()
                .stream()
                .map(ProductDTOConverter::convertProductToDTO)
                .toList();

        return GetProductsResponseDTO.builder().products(products).build();
    }
}
