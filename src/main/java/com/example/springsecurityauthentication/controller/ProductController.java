package com.example.springsecurityauthentication.controller;


import com.example.springsecurityauthentication.business.EditProductUseCaseImpl;
import com.example.springsecurityauthentication.business.impl.DeleteProductUseCase;
import com.example.springsecurityauthentication.business.impl.GetAllProductsUseCase;
import com.example.springsecurityauthentication.business.impl.GetProductUseCase;
import com.example.springsecurityauthentication.business.impl.ProductUseCase;
import com.example.springsecurityauthentication.config.exception.ProductNotFoundWithThatIDException;
import com.example.springsecurityauthentication.dto.*;
import com.example.springsecurityauthentication.persistence.entity.Category;
import com.example.springsecurityauthentication.persistence.entity.Product;
import com.example.springsecurityauthentication.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ProductController {

    private final ProductUseCase productUseCase;
    private final GetAllProductsUseCase productsUseCase;
    private final GetProductUseCase getProductUseCase;
    private final DeleteProductUseCase deleteProductUseCase;
    private final EditProductUseCaseImpl editProductUseCase;
    private final AccessTokenDTO accessTokenDTO;


    @PostMapping("/add")
    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})

    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestParam("images") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("availablequantity") int availablequantity,
            @RequestParam("price") double price,
            @RequestParam("costPrice") double costPrice,
            @RequestParam("category") String category) throws IOException {

        // Build the request DTO
        ProductRequestDTO request = ProductRequestDTO.builder()
                .name(name)
                .availablequantity(availablequantity)
                .price(price)
                .costPrice(costPrice)
                .category(Category.valueOf(category))
                .build();

        // Call the ProductUseCase method passing the request and images
        ProductResponseDTO response = productUseCase.CreateNewProduct(request, file);

        // Return the response with HttpStatus.CREATED
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


   /// @isAuthenticated
    //@RolesAllowed({"ROLE_ADMIN", "ROLE_SALES_MANAGER"}) // "ROLE_CUSTOMER",
    @GetMapping
    public ResponseEntity<GetProductsResponseDTO> getProducts() {
        return ResponseEntity.ok(productsUseCase.getProducts());
    }

//    @isAuthenticated
//    @RolesAllowed({"ROLE_ADMIN","ROLE_CUSTOMER", "ROLE_SALES_MANAGER"})
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) throws ProductNotFoundWithThatIDException {
        final Optional<ProductDTO> productOptional = getProductUseCase.getProduct(id);
        if (productOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(productOptional.get());
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})
    @PutMapping("/{productId}")

    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long productId,
                                                            @RequestParam(value = "file", required = false) MultipartFile file,
                                                            @RequestParam("name") String name,
                                                            @RequestParam("availablequantity") int quantity,
                                                            @RequestParam("category") Category category,
                                                            @RequestParam("price") double price,
                                                            @RequestParam("costPrice") double costPrice) throws IOException {
        // Create an EditProductRequestDTO with the provided parameters
        EditProductRequestDTO request = new EditProductRequestDTO();
        request.setName(name);
        request.setAvailablequantity(quantity);
        request.setCategory(category);
        request.setPrice(price);
        request.setCostPrice(costPrice);


        // Call the productService's updateProduct method passing the provided parameters
        Product updatedProduct = editProductUseCase.EditProduct(request, productId, file);

        // Convert the updated product to ProductDtoResponse
        ProductResponseDTO productResponseDTO = ProductResponseDTO.builder()
                .productId(updatedProduct.getProductId())
                .name(updatedProduct.getName())
                .quantity(updatedProduct.getAvailablequantity())
                .price(updatedProduct.getPrice())
                .category(updatedProduct.getCategory())
                .image(updatedProduct.getProductImages())
                .build();

        return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
    }

//    @PutMapping("/{productId}")
//    public ProductResponseDTO updateProduct(@PathVariable Long productId,
//            @RequestParam(value = "file", required = false) MultipartFile file,
//            @RequestParam("name") String name,
//            @RequestParam("description") String description,
//            @RequestParam("quantity") int quantity,
//            @RequestParam("price") double price) throws IOException {
//        return editProductUseCase.EditProduct(productId, file, name, description, quantity, price);
//    }
//            @RequestPart @Valid EditProductRequestDTO request,
//            @PathVariable Long productId,
//            @RequestPart(value = "images", required = false) MultipartFile images) throws ProductNotFoundWithThatIDException {
//        Product updatedProduct = editProductUseCase.EditProduct(request, productId, images);
//        return ResponseEntity.status(HttpStatus.OK).body(updatedProduct);
   // }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws ProductNotFoundWithThatIDException {
        deleteProductUseCase.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}

