package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.configuration.exception.InvalidUserException;
import com.example.springsecurityauthentication.dto.AccessTokenDTO;
import com.example.springsecurityauthentication.dto.OrderDTO;
import com.example.springsecurityauthentication.persistence.UserRepository;
import com.example.springsecurityauthentication.persistence.entity.Order;
import com.example.springsecurityauthentication.persistence.entity.OrderRepository;
import com.example.springsecurityauthentication.persistence.entity.RoleEnum;
import com.example.springsecurityauthentication.security.auth.UnauthorizedDataAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetOrderUseCaseImpl implements GetOrderUseCase {

    private final OrderRepository orderRepository;
    private final AccessTokenDTO requestAccessToken;
    private final UserRepository userRepository;

    @Override
    public Optional<OrderDTO> getOrderDetail(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);

        if (order.isEmpty()) {
            throw new InvalidUserException("THAT_ORDER_ID_DOES_NOT_EXISTS");
        }

        if (!requestAccessToken.hasRole(RoleEnum.ADMIN.name())) {
            Long userId = requestAccessToken.getUserId();

            // Fetch the order and check if it belongs to the logged-in user
            Optional<Order> userOrder = orderRepository.findByIdAndUserId(orderId, userId);

            // If the order doesn't belong to the user, throw UnauthorizedDataAccessException
            if (userOrder.isEmpty()) {
                throw new UnauthorizedDataAccessException("USER_DOES_NOT_HAVE_ACCESS_TO_ORDER");
            }
        }

        return order.map(OrderDTOConverter::convertOrderToDTO);
    }
}

