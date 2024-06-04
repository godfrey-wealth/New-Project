package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.EditProductRequestDTO;
import com.example.springsecurityauthentication.persistence.entity.Product;
import org.springframework.web.multipart.MultipartFile;

public interface EditProductUseCase {
  public  Product EditProduct(EditProductRequestDTO request, Long Id, MultipartFile file);
}
