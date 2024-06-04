package com.example.springsecurityauthentication.dto;


import com.example.springsecurityauthentication.persistence.entity.Category;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long productId;
    private String name;
    private int availablequantity;
    private double price;

    private double costPrice;

   private Category category;

    @Lob
    @Column(length = 50000000)
   private byte[] prodImage;

    //private int imageId;

}
