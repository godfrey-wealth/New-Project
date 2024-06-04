package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.business.impl.ProductUseCase;
import com.example.springsecurityauthentication.config.exception.ProductAlreadyExistsException;
import com.example.springsecurityauthentication.dto.ProductDTO;
import com.example.springsecurityauthentication.dto.ProductRequestDTO;
import com.example.springsecurityauthentication.dto.ProductResponseDTO;
import com.example.springsecurityauthentication.persistence.ProductRepository;
import com.example.springsecurityauthentication.persistence.entity.Category;
import com.example.springsecurityauthentication.persistence.entity.Product;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProductUseCaseImpl implements ProductUseCase {
    private final ProductRepository productRepository;


    @Transactional
    @Override
    public ProductResponseDTO CreateNewProduct(ProductRequestDTO request, MultipartFile file) throws IOException {
        if (productRepository.existsByName(request.getName())) {
            throw new ProductAlreadyExistsException();
        } else if (productRepository.existsByAvailablequantity(request.getAvailablequantity())) {
            throw new ProductAlreadyExistsException();
        } else if (productRepository.existsByPrice(request.getPrice())) {
            throw new ProductAlreadyExistsException();
        }

        // Extract the byte array data from the MultipartFile
        byte[] imageData = file.getBytes();

        // Create a new product with image data
        Product newProduct = Product.builder()
                .name(request.getName())
                .availablequantity(request.getAvailablequantity())
                .price(request.getPrice())
                .costPrice(request.getCostPrice())
                .category(Category.valueOf(String.valueOf(request.getCategory()))) // Convert category string to enum
                .productImages(imageData) // Set image data
                .build();

        // Save the product to the database
        productRepository.save(newProduct);

        // Convert the newly created product to DTO using ProductDTOConverter
        ProductDTO productDTO = ProductDTOConverter.convertProductToDTO(newProduct);

        return ProductResponseDTO.builder()
                .productId(productDTO.getProductId())
                .image(productDTO.getProdImage())
                .build();
    }
}
