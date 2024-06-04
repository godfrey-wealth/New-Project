package com.example.springsecurityauthentication.dto;


import com.example.springsecurityauthentication.persistence.entity.ShoppingCart;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {

//    public OrderDTO getOrderId() {
//        return orderId;
//    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    private Long orderId;
    private String orderDescription;
    private List<ShoppingCart> cartItems;

    @Lob
    @Column(length = 50000000)
    private byte[] prodImage;

    private  UserDTO user;



    public Double getTotalAmount() {
        return TotalAmount;
    }

    private Double TotalAmount;



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


    @Override
    public String toString() {
        return "OrderDTO{" +
                "orderDescription='" + orderDescription + '\'' +
                ", cartItems=" + cartItems +

                '}';
    }

}
