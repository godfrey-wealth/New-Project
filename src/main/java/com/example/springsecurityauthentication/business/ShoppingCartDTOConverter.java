package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.dto.ShoppingCartDTO;
import com.example.springsecurityauthentication.persistence.entity.ShoppingCart;

public final class ShoppingCartDTOConverter {
    private ShoppingCartDTOConverter() {
    }

    public static ShoppingCartDTO convertShoppingToDTO(ShoppingCart cart) {

//        String imageBase64String = null;
//        Set<ImageModel> images = cart.getProductImages();
//        if (images != null && !images.isEmpty()) {
//            // Assuming only one image is associated with the shopping cart
//            ImageModel image = images.iterator().next();
//            byte[] imageData = image.getProductImage();
//            if (imageData != null && imageData.length > 0) {
//                imageBase64String = Base64.getEncoder().encodeToString(imageData);
//            }
//        }
        // Convert image byte arrays to Base64 strings
//        List<String> imageBase64Strings = new ArrayList<>();
//        Set<ImageModel> productImages = cart.getProductImages();
//        for (ImageModel image : productImages) {
//            String base64EncodedImage = Base64.getEncoder().encodeToString(image.getProductImage());
//            imageBase64Strings.add(base64EncodedImage);
//        }


        return ShoppingCartDTO.builder()
                .id(cart.getCartId())
                .productName(cart.getProductName())
                .quantity(cart.getQuantity())
                .amount(cart.getAmount())
                .proudctImage(cart.getProductImages())
                .build();
    }
}
