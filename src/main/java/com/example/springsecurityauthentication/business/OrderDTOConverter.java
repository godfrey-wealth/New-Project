//package com.example.springsecurityauthentication.business;
//
//
//import com.example.springsecurityauthentication.dto.OrderDTO;
//import com.example.springsecurityauthentication.persistence.entity.Order;
//
//public final class OrderDTOConverter {
//    private OrderDTOConverter() {
//    }
//
//    public static OrderDTO convertOrderToDTO(Order newOrder) {
//
////        Set<String> imageBase64Strings = new HashSet<>();
////        for (ImageModel image : newOrder.) {
////            String base64EncodedImage = Base64.getEncoder().encodeToString(image.getPicByte());
////            imageBase64Strings.add(base64EncodedImage);
////        }
//
//        return OrderDTO.builder()
//                .orderId(newOrder.getId())
//                .orderDescription(newOrder.getOrderDescription())
//                .cartItems(newOrder.getCartItems())
//
//               // .imageBase64Strings(imageBase64Strings)
//                //.imageId(newOrder.getImageId())
//                .user(OrderUserDTOConverter.convertUserToDTO(newOrder.getUser()))
//                .TotalAmount(newOrder.getTotalAmount())
//                .build();
//
//
//    }
//
//}


package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.dto.OrderDTO;
import com.example.springsecurityauthentication.persistence.entity.Order;

public final class OrderDTOConverter {
    private OrderDTOConverter() {
    }

    public static OrderDTO convertOrderToDTO(Order order) {
//        Set<String> imageBase64Strings = new HashSet<>();
//        for (ImageModel image :  order.getProductImage()) {
//            String base64EncodedImage = Base64.getEncoder().encodeToString(image.getProductImage());
//            imageBase64Strings.add(base64EncodedImage);
//        }
//        // Convert ImageModel to ImageDTO
//        Set<ImageDTO> imageDTOs = new HashSet<>();
//        for (ImageModel image : order.getProductImage()) {
//            ImageDTO imageDTO = ImageDTOConverter.convertImageToDTO(image);
//            imageDTOs.add(imageDTO);
//        }
        return OrderDTO.builder()
               .orderId(order.getId())
                .orderDescription(order.getOrderDescription())
                .cartItems(order.getCartItems())
                //.prodImage(order.)
                //.imageDTOs(imageDTOs)
                .user(OrderUserDTOConverter.convertUserToDTO(order.getUser()))
                .TotalAmount(order.getTotalAmount())
                .build();
    }
}
