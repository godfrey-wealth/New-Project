package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.dto.GetAllOrdersRequestDTO;
import com.example.springsecurityauthentication.dto.GetOrdersResponseDTO;
import com.example.springsecurityauthentication.dto.OrderDTO;
import com.example.springsecurityauthentication.persistence.entity.Order;
import com.example.springsecurityauthentication.persistence.entity.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetOrdersUseCaseImpl implements GetAllOrdersUseCase {
    private final OrderRepository orderRepository;

//    @Override
//    public GetUsersResponseDTO getUsers() {
//        return null;
//    }

//    @Override
//    public GetOrdersResponseDTO getOrders(GetAllOrdersRequestDTO requestDTO) {
//
//
//        List<OrderDTO> Orders = orderRepository.findAll()
//                .stream()
//                .map(OrderDTOConverter::convertOrderToDTO)
//                .toList();
//
//        return GetOrdersResponseDTO.builder().orders(Orders).build();
//    }

    @Override
    public GetOrdersResponseDTO getOrders(GetAllOrdersRequestDTO requestDTO) {
        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> orderDTOs = orders.stream()
                .map(OrderDTOConverter::convertOrderToDTO)
                .collect(Collectors.toList());

        return GetOrdersResponseDTO.builder()
                .orders(orderDTOs)
                .build();
    }
}
