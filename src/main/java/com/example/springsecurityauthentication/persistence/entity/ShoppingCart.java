package com.example.springsecurityauthentication.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    private Long productId;
    private String productName;
    private int quantity;

    @Lob
    @Column(length = 50000000)
    private byte[] productImages;
    private double amount;


    @Override
    public String toString() {
        return "ShoppingCart{" +
                "cartId=" + cartId +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", amount=" + amount +
                ", productImages=" + productImages +
                '}';
    }
}
