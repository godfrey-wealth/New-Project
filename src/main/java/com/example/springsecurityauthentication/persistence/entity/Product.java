package com.example.springsecurityauthentication.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "stocks")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "productId")
    private Long productId;

    @NotBlank(message = "Product item cannot be empty")
    @Column(name = "name")
    @Length(max = 50)
    private String name;

    @NonNull
    private int availablequantity;
    private double price;

    private double costPrice;

    @Column(name="category")
    @Enumerated(EnumType.STRING)
    private Category category;


    @Lob
   @Column(length = 50000000)
    private byte[] productImages;



}
