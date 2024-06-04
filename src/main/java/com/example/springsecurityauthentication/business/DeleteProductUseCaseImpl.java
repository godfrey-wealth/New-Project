package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.DeleteProductUseCase;
import com.example.springsecurityauthentication.config.exception.ProductNotFoundWithThatIDException;
import com.example.springsecurityauthentication.persistence.ProductRepository;
import com.example.springsecurityauthentication.persistence.entity.Product;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeleteProductUseCaseImpl implements DeleteProductUseCase {
    private final ProductRepository productRepository;


    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Optional<Product> deleteProduct = productRepository.findById(id);

        if(!productRepository.existsById(id))
        {
            throw new ProductNotFoundWithThatIDException(id);
        }
        else if(productRepository.existsById(id))
        {
            productRepository.deleteById(deleteProduct.get().getProductId());

        }


    }
}
