package com.example.springsecurityauthentication.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
public class ShoppingCartRequest {

    private Long id;

    private Long productId;
    private String productName;

    private int quantity;
    private double amount;

    @Lob
    @Column(length = 50000000)
    private byte[] images; //

//    public Long getOrderId() {
//        return orderId;
//    }

   // private Long orderId;

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
