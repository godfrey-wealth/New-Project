package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.ProductRequestDTO;
import com.example.springsecurityauthentication.dto.ProductResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductUseCase {
    ProductResponseDTO CreateNewProduct(ProductRequestDTO request, MultipartFile file) throws IOException;
    //ProductResponseDTO CreateNewProduct(ProductRequestDTO request);
}
