package com.example.springsecurityauthentication.dto;

import com.example.springsecurityauthentication.persistence.entity.Category;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductResponseDTO {

    private Long productId;

    private String name;

    private int quantity;

    private double price;

    private Category category;
    @Lob
    @Column(length = 500000)
    private  byte[] image;
}
