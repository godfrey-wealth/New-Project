package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.PaymentUseCase;
import com.example.springsecurityauthentication.config.exception.UserAlreadyExistsException;
import com.example.springsecurityauthentication.dto.AccessTokenDTO;
import com.example.springsecurityauthentication.dto.PaymentRequestDTO;
import com.example.springsecurityauthentication.dto.PaymentResponse;
import com.example.springsecurityauthentication.persistence.PaymentRepository;
import com.example.springsecurityauthentication.persistence.UserRepository;
import com.example.springsecurityauthentication.persistence.entity.OrderRepository;
import com.example.springsecurityauthentication.persistence.entity.Payment;
import com.example.springsecurityauthentication.persistence.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PaymentUseCaseImpl implements PaymentUseCase {

    private final PaymentRepository payCardRepository;

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final AccessTokenDTO requestAccessToken;
    @Override
    public PaymentResponse processPayment(PaymentRequestDTO request) {

        if(payCardRepository.existsByZipcode(request.getZipcode())) {

            throw new UserAlreadyExistsException();
        }
        if (payCardRepository.existsByAddress(request.getAddress())) {
            throw new UserAlreadyExistsException();
        }

        if(payCardRepository.existsByIbanCardno(request.getIbanCardno()))

        {
            throw new UserAlreadyExistsException();
        }



        Payment savedPayment = saveNewOrder(request);

        return PaymentResponse.builder()
                .payId(savedPayment.getId())
                .build();
    }


    private Payment saveNewOrder(PaymentRequestDTO  request) {

        User userEntity = userRepository.findById(request.getUserid()).get();
        //Order newOrder = orderRepository.findById(request.getUserid()).get();
        Payment newPayment = Payment.builder()
                .user(userEntity)
                //.id(request.getUserid())
                .firstname(request.getFirstname())
                .address(request.getAddress())
                .zipcode(request.getZipcode())
                .ibanCardno(request.getIbanCardno())
                .type(request.getType())
                .date(request.getDate())
                //.totalAmount(newOrder.getTotalAmount())
                .totalAmount(request.getTotalAmount())
                .build();
        return payCardRepository.save(newPayment);
    }
}


