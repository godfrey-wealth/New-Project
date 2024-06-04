package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.PaymentDTO;
import com.example.springsecurityauthentication.persistence.entity.Payment;



//@Component

public  final class PaymentConverterDTO {

    private PaymentConverterDTO() {
    }

   // public static PaymentDTO convertPaymentToDTO(Payment ) {
    public PaymentDTO convertToEntity(Payment payment) {
        return PaymentDTO.builder()
                .firstname(payment.getFirstname())
                .address(payment.getAddress())
                .zipcode(payment.getZipcode())
                .ibanCardno(payment.getIbanCardno())
                .type(payment.getType())
                .totalAmount(payment.getTotalAmount())
                .date(payment.getDate())
                .user(OrderUserDTOConverter.convertUserToDTO(payment.getUser()))
                //.user(UserDTOConverter.convertUserToDTO(payment.getUser()))
                .build();
    }

//    public PaymentResponse convertToResponse(Payment payment) {
//        return PaymentResponse.builder()
//                .payId(payment.getId()) // Assuming id field exists in Payment entity
//                .build();
//    }
}