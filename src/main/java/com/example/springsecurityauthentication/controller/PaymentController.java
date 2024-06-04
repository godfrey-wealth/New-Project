package com.example.springsecurityauthentication.controller;

import com.example.springsecurityauthentication.business.impl.PaymentUseCase;
import com.example.springsecurityauthentication.dto.PaymentRequestDTO;
import com.example.springsecurityauthentication.dto.PaymentResponse;
import com.example.springsecurityauthentication.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentUseCase paymentUseCase;

//    @Autowired
//    public PaymentController(PaymentUseCase paymentUseCase) {
//        this.paymentUseCase = paymentUseCase;
//    }

//    @PostMapping
//    public PaymentResponse processPayment(@RequestBody PaymentRequestDTO paymentRequestDTO) {
//        return paymentUseCase.processPayment(paymentRequestDTO);
//    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody @Valid PaymentRequestDTO request) {
        PaymentResponse response = paymentUseCase.processPayment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
}
