package com.example.springsecurityauthentication.controller;

import com.example.springsecurityauthentication.business.impl.GetAllProductsUseCase;
import com.example.springsecurityauthentication.dto.GetProductsResponseDTO;
import com.example.springsecurityauthentication.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CustomerProductController {

    private final GetAllProductsUseCase productsUseCase;
    @isAuthenticated
  @RolesAllowed({"ROLE_ADMIN", "ROLE_CUSTOMER", "ROLE_SALES_MANAGER"}) // "ROLE_CUSTOMER",
    @GetMapping
   public ResponseEntity<GetProductsResponseDTO> getAllProducts() {
        return ResponseEntity.ok(productsUseCase.getProducts());
    }
}
