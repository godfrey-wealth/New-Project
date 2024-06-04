package com.example.springsecurityauthentication.dto;

import com.example.springsecurityauthentication.persistence.entity.PaymentType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private Long id;

    private String firstname;
    private String address;

    private String zipcode;

    private String ibanCardno;

    @Column(name="PayType")
    @Enumerated(EnumType.STRING)
    private PaymentType type;

    private double totalAmount;

    private UserDTO user;
    private String date;
}
