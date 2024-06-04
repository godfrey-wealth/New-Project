package com.example.springsecurityauthentication.dto;


import com.example.springsecurityauthentication.persistence.entity.Category;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EditProductRequestDTO {
    private Long id;

    @NotBlank(message = "Email cannot be empty")
//    @Length(max = 50)
    private String name;

    @NotNull
//    @Length(max = 50)
    private int availablequantity;

    @NotNull
//    @Length(max = 50)
    private double price;

    private double costPrice;
    @Enumerated(EnumType.STRING)
    @Column(name="category")
    @NotNull
//    @Length(max = 50)
    private Category category;
    @Lob
    @Column(length = 5000000)
    private byte[] images; // List of byte arrays representing images



}
