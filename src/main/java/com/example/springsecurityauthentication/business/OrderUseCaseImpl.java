package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.business.impl.UserIdValidator;
import com.example.springsecurityauthentication.config.exception.AlreadyExistsExceptionMessage;
import com.example.springsecurityauthentication.dto.AccessTokenDTO;
import com.example.springsecurityauthentication.dto.CreateOrderRequestDTO;
import com.example.springsecurityauthentication.dto.CreateOrderResponseDTO;
import com.example.springsecurityauthentication.persistence.ProductRepository;
import com.example.springsecurityauthentication.persistence.UserRepository;
import com.example.springsecurityauthentication.persistence.entity.*;
import com.example.springsecurityauthentication.security.auth.UnauthorizedDataAccessException;
import com.example.springsecurityauthentication.security.auth.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderUseCaseImpl implements OrderUseCase {

//    private  final OrderRepository orderRepository;
//    private final ProductRepository productRepository;
//
//    private final UserRepository userRepository;
//    private final UserIdValidator userIdValidator;
//
//    private final AccessTokenDTO requestAccessToken;
//
//
//
//
//
//    public Double getCartAmount(List<ShoppingCart> shoppingCartList) {
//
//        Double totalCartAmount = 0.0;
//
//
//        double singleCartAmount = 0f;
//        int availableQuantity = 0;
//
//        for (ShoppingCart cart : shoppingCartList) {
//
//            int productId = Math.toIntExact(cart.getProductId());
//            Optional<Product> product = productRepository.findById((long) productId);
//            if (product.isPresent()) {
//                Product product1 = product.get();
//                if (product1.getAvailablequantity() < cart.getQuantity()) {
//                    singleCartAmount = product1.getPrice() * product1.getAvailablequantity();
//                    cart.setQuantity(product1.getAvailablequantity());
//                } else {
//                    singleCartAmount = cart.getQuantity() * product1.getPrice();
//                    availableQuantity = product1.getAvailablequantity() - cart.getQuantity();
//                }
//                totalCartAmount = totalCartAmount + singleCartAmount;
//                product1.setAvailablequantity(availableQuantity);
//                availableQuantity=0;
//                cart.setProductName(product1.getName());
//                cart.setAmount((Double) singleCartAmount);
//
//                productRepository.save(product1);
//            }
//        }
//        return  totalCartAmount;
//    }
//
//    @Override
//    public CreateOrderResponseDTO createNewOrder(CreateOrderRequestDTO request) {
//        if (orderRepository.existsByOrderDescription(request.getOrderDescription())) {
//            throw new AlreadyExistsExceptionMessage();
//        }
//
//        if (requestAccessToken.getUserId() != request.getUserId()) {
//            throw new UnauthorizedDataAccessException("STUDENT_ID_NOT_FROM_LOGGED_IN_USER");
//        }
//
//
//        userIdValidator.validateId(request.getUserId());
//
//        Order savedOrder = saveNewOrder(request);
//
//        return CreateOrderResponseDTO.builder()
//                .orderId(savedOrder.getId())
//                .totalAmount(savedOrder.getTotalAmount())
//                .build();
//
//    }
//
//
//
//    private Order saveNewOrder(CreateOrderRequestDTO request) {
//        User userEntity = userRepository.findById(request.getUserId()).get();
//        double totalAmount = getCartAmount(request.getCartItems());
//        Order newOrder = Order.builder()
//               // .id(request.getId())
//                .user(userEntity)
//                .orderDescription(request.getOrderDescription())
//                .cartItems(request.getCartItems())
//                .totalAmount(totalAmount)
//                //.totalAmount(request.getTotalAmount())
//
//                //.request.getTotalPrice())
//                .build();
//        return orderRepository.save(newOrder);
//    }


    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final UserIdValidator userIdValidator;
    private final AccessTokenDTO requestAccessToken;

    @Override
    public CreateOrderResponseDTO createNewOrder(CreateOrderRequestDTO request) {
        if (orderRepository.existsByOrderDescription(request.getOrderDescription())) {
            throw new AlreadyExistsExceptionMessage();
        }

        if (!requestAccessToken.getUserId().equals(request.getUserId())) {
            throw new UnauthorizedDataAccessException("STUDENT_ID_NOT_FROM_LOGGED_IN_USER");
        }

        userIdValidator.validateId(request.getUserId());
        Order savedOrder = saveNewOrder(request);
        return CreateOrderResponseDTO.builder()
                .orderId(savedOrder.getId())
                .invoiceNumber(setInvoiceNumber())
                .date(setDate(DateUtil.getCurrentDateTime()))
                .totalAmount(savedOrder.getTotalAmount())

                .build();
    }

    private int setInvoiceNumber() {
        // Your logic to set the invoice number, for example, generating a random number
        return new Random().nextInt(1000);
    }

    private String setDate(String dateTime) {
        // Your logic to set the date as a string
        return dateTime;
    }

    private Order saveNewOrder(CreateOrderRequestDTO request) {
        User userEntity = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + request.getUserId()));

        double totalAmount = getCartAmount(request.getCartItems());
        Order newOrder = Order.builder()
                 .id(request.getId())
                .user(userEntity)
                .orderDescription(request.getOrderDescription())
                .cartItems(request.getCartItems())
                .totalAmount(totalAmount)
                .build();
        return orderRepository.save(newOrder);
    }

    public Double getCartAmount(List<ShoppingCart> shoppingCartList) {
        double totalCartAmount = 0.0;


        for (ShoppingCart cart : shoppingCartList) {
            Optional<Product> product = productRepository.findById(cart.getProductId());
            if (product.isPresent()) {
                Product product1 = product.get();
                int availableQuantity = product1.getAvailablequantity();
                int cartQuantity = cart.getQuantity();
                double singleCartAmount = Math.min(cartQuantity, availableQuantity) * product1.getPrice();
                totalCartAmount += singleCartAmount;
                product1.setAvailablequantity(availableQuantity - cartQuantity);
                cart.setProductName(product1.getName());
                // Retrieve product images before saving the cart
                cart.setProductImages(product1.getProductImages());
                cart.setAmount(singleCartAmount);
                productRepository.save(product1);
            }
        }
        return totalCartAmount;
    }

    // Convert byte array images to Base64 strings
//    public List<String> getProductImageAsBase64() {
//        List<String> base64Images = new ArrayList<>();
//        for (byte[] image : productImage) {
//            String base64EncodedImage = Base64.getEncoder().encodeToString(image);
//            base64Images.add(base64EncodedImage);
//        }
//        return base64Images;
//    }
}
