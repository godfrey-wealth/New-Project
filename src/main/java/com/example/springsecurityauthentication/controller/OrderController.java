package com.example.springsecurityauthentication.controller;


import com.example.springsecurityauthentication.business.GetAllOrdersUseCase;
import com.example.springsecurityauthentication.business.GetOrderUseCase;
import com.example.springsecurityauthentication.business.GetShoppingCartsUseCase;
import com.example.springsecurityauthentication.business.OrderUseCase;
import com.example.springsecurityauthentication.business.impl.*;
import com.example.springsecurityauthentication.dto.*;
import com.example.springsecurityauthentication.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin( origins = "http://localhost:3000")
@AllArgsConstructor
public class OrderController {

    //private OrderUseCase orderService;
   private  OrderUseCase orderUseCase;
    private ProductUseCase createProductUseCase;

    private GetProductUseCase getProductUseCase;


    private GetAllProductsUseCase getAllProductUseCase;

    private CreateOrderUseCase createOrderUseCase;

    private final GetUserUseCase getUserUseCase;


    private final AccessTokenDTO requestAccessToken;

    private final SignUpUseCase signUpUseCase;

   // private  final GetUserDiscountUseCase getUserDiscountUseCase;

    private final   GetAllOrdersUseCase getAllOrdersUseCase;

    private final GetShoppingCartsUseCase getShoppingCartsUseCase;

    private  final GetOrderUseCase getOrderUseCase;

    private final AccessTokenDTO accessTokenDTO;
//    @isAuthenticated
//    @RolesAllowed({"ROLE_SALES_MANAGER", "ROLE_CUSTOMER"})
//
//    @GetMapping("/getCartItems")
//    public ResponseEntity<GetOrdersResponseDTO> getAllOrders(GetAllOrdersRequestDTO request) {
//        return ResponseEntity.ok(getAllOrdersUseCase.getOrders(request));
//    }
//
//    @GetMapping
//    public ResponseEntity<GetShoppingCartsResponseDTO> getAllShoppingCarts(GetShoppingCartsRequestDTO request) {
//        return ResponseEntity.ok(getShoppingCartsUseCase.getCartItems(request));
//    }
//
//
//
//
//    @isAuthenticated
//    @RolesAllowed({ "ROLE_CUSTOMER", "ROLE_SALES_MANAGER"})
//    @GetMapping( "/{id}")
//    public ResponseEntity<OrderDTO> getOrderDetails(@PathVariable Long id) {
//
//        final Optional<OrderDTO> userOptional = getOrderUseCase.getOrderDetail(id);
//        if (userOptional.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        return  ResponseEntity.ok().body(userOptional.get());
//    }
//
//
//
//    @isAuthenticated
//    @RolesAllowed({"ROLE_CUSTOMER"})
//    @PostMapping
//    public ResponseEntity<CreateOrderResponseDTO> placeOrder(@RequestBody CreateOrderRequestDTO orderDTO) {
//
////        CreateOrderResponseDTO responseOrderDTO = new CreateOrderResponseDTO();
//        CreateOrderResponseDTO responseOrderDTO = orderService.createNewOrder(orderDTO);
//        Double amount = orderService.getCartAmount(orderDTO.getCartItems());
//
//
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseOrderDTO);
//
//    }


    @isAuthenticated
    @RolesAllowed({"ROLE_SALES_MANAGER", "ROLE_CUSTOMER", "ROLE_ADMIN"})
    @GetMapping
    public ResponseEntity<GetOrdersResponseDTO> getOrders() {
        GetAllOrdersRequestDTO requestDTO = new GetAllOrdersRequestDTO();
        GetOrdersResponseDTO responseDTO = getAllOrdersUseCase.getOrders(requestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }
//    @GetMapping
//    public ResponseEntity<GetOrdersResponseDTO> getAllOrders(@RequestBody GetAllOrdersRequestDTO request) {
//        return ResponseEntity.ok(getAllOrdersUseCase.getOrders(request));
//    }

//    @GetMapping
//    public ResponseEntity<GetShoppingCartsResponseDTO> getAllShoppingCarts(@RequestBody GetShoppingCartsRequestDTO request) {
//        return ResponseEntity.ok(getShoppingCartsUseCase.getCartItems(request));
//    }

//    @isAuthenticated
//    @RolesAllowed({"ROLE_CUSTOMER", "ROLE_ADMIN", "ROLE_SALES_MANAGER"})
    @isAuthenticated
   @RolesAllowed({"ROLE_CUSTOMER"})
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderDetails(@PathVariable Long orderId) {
        final Optional<OrderDTO> orderOptional = getOrderUseCase.getOrderDetail(orderId);
        final Optional<UserDTO> userOptional = getUserUseCase.getUser(accessTokenDTO.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return orderOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_CUSTOMER"})
    @PostMapping
    public ResponseEntity<CreateOrderResponseDTO> placeOrder(@RequestBody CreateOrderRequestDTO orderDTO) {
        CreateOrderResponseDTO responseOrderDTO = orderUseCase.createNewOrder(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseOrderDTO);
    }


}

