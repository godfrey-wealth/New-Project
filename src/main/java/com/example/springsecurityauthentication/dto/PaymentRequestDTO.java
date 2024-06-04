package com.example.springsecurityauthentication.dto;

import com.example.springsecurityauthentication.persistence.entity.PaymentType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {

   // private  Long id;
    private String firstname;
    private String address;

    private String zipcode;

    @NotBlank(message = "keep numbers and letters only")
    @Pattern(regexp = "^NL\\d{2}INGB\\d{10}$", message = "Invalid IBAN card number format. It should start with 'NL' followed by 2 digits, 'INGB', and 10 digits.")
    @Length(min = 14, max = 18)
    private String ibanCardno;



    @Column(name="PayType")
    @Enumerated(EnumType.STRING)
    private PaymentType type;

    private double totalAmount;

//    private List<Order> orders;
// public Double getTotalAmount()
// {
//  Double totalAmount = 0.0;
//  for (Order item : orders)
//  {
//   totalAmount += item.getTotalAmount();
//  }
//  return  totalAmount;
// }
    private String date;


    private Long userid;


}
