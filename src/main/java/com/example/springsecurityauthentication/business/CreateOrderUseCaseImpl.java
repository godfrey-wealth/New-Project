package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.business.impl.CreateOrderUseCase;
import com.example.springsecurityauthentication.business.impl.UserIdValidator;
import com.example.springsecurityauthentication.config.exception.AlreadyExistsExceptionMessage;
import com.example.springsecurityauthentication.dto.CreateOrderRequestDTO;
import com.example.springsecurityauthentication.dto.CreateOrderResponseDTO;
import com.example.springsecurityauthentication.persistence.UserRepository;
import com.example.springsecurityauthentication.persistence.entity.Order;
import com.example.springsecurityauthentication.persistence.entity.OrderRepository;
import com.example.springsecurityauthentication.persistence.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

;

@Service
@AllArgsConstructor
public class CreateOrderUseCaseImpl implements CreateOrderUseCase {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final UserIdValidator userIdValidator;

    @Override
    public CreateOrderResponseDTO createNewOrder(CreateOrderRequestDTO request) {
        if (orderRepository.existsByOrderDescription(request.getOrderDescription())) {
            throw new AlreadyExistsExceptionMessage();
        }

        userIdValidator.validateId(request.getUserId());

        Order savedOrder = saveNewOrder(request);

        return CreateOrderResponseDTO.builder()
                .orderId(savedOrder.getId())

                .build();



    }

    private Order saveNewOrder(CreateOrderRequestDTO request) {
        User userEntity = userRepository.findById(request.getUserId()).get();
           // countryEntity.
        Order newOrder = Order.builder()
                .user(userEntity)
               // .id(request.getId())
                .orderDescription(request.getOrderDescription())
                .cartItems(request.getCartItems())


                .build();
        return orderRepository.save(newOrder);
    }
}
