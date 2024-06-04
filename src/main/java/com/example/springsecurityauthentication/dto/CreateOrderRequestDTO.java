package com.example.springsecurityauthentication.dto;


import com.example.springsecurityauthentication.persistence.entity.ShoppingCart;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateOrderRequestDTO {

    private  Long Id;
    private String orderDescription;
    private List<ShoppingCart> cartItems;
    @Lob
    @Column(length = 50000000)
    private byte[] images;
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    private Long userId;

    private String email;

    private String password;


//    private String date;
    private String OrderDescription;


    public String getOrderDescription() {
        return orderDescription;
    }

    public void setOrderDescription(String orderDescription) {
        this.orderDescription = orderDescription;
    }

    public List<ShoppingCart> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<ShoppingCart> cartItems) {
        this.cartItems = cartItems;
    }

    private double totalAmount;

    public Double getTotalPrice()
    {
        Double totalAmount = 0.0;
        for (ShoppingCart item : cartItems)
        {
            totalAmount += item.getAmount() * item.getQuantity();
        }
        return  totalAmount;
    }


}
