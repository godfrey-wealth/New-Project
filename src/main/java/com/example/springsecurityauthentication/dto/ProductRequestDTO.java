package com.example.springsecurityauthentication.dto;


import com.example.springsecurityauthentication.persistence.entity.Category;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {

    @Lob
    @Column(length = 50000000)
    private byte[] images; // Change from byte[] to List<byte[]>
    private Long productId;
    @NotBlank(message = "Product name cannot be empty")
    @Length(max = 50)
    private String name;

//    @NotBlank
//    @Length(max = 20)
    private int  availablequantity;

    private  double price;
    private  double costPrice;
    private Category category;


}
