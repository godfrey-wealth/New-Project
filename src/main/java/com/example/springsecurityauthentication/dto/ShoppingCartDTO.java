package com.example.springsecurityauthentication.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
*/
//@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ShoppingCartDTO {

    private Long id;

    private Long productId;
    private String productName;

    private int quantity;
    private double amount;

    private OrderDTO order;

    @Lob
    @Column(length = 50000000)
    private byte[] proudctImage;

//    // Constructor, getters, and setters
//
//    //public void setImageBase64String(String imageBase64String) {
//        this.imageBase64String = imageBase64String;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "ShoppingCart{" +
                "id=" + id +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", amount=" + amount +
                '}';
    }
}
