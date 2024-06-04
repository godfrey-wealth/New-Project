package com.example.springsecurityauthentication.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CreateOrderResponseDTO {

    private Double amount;
    private int invoiceNumber;
    private String date;
    private String OrderDescription;
    private Long orderId;

    public Double getAmount() {
        return this.amount;
    }

//    public double setAmount(Double amount) {
//        this.amount = amount;
//        return 0;
//    }

    private  double totalAmount;
    public int getInvoiceNumber() {
        return invoiceNumber;
    }

    public int setInvoiceNumber(int invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
        return invoiceNumber;
    }

    public String getDate() {
        return date;
    }

    public String setDate(String date) {
        this.date = date;
        return date;
    }

    public String getOrderDescription() {
        return OrderDescription;
    }

    public void setOrderDescription(String orderDescription) {
        OrderDescription = orderDescription;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}
