package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.dto.ProductDTO;
import com.example.springsecurityauthentication.persistence.entity.Product;

import java.util.Base64;

public final class ProductDTOConverter {

    private ProductDTOConverter() {
    }

    public static ProductDTO convertProductToDTO(Product product) {
        // Convert image byte arrays to Base64 strings
//        List<String> imageBase64Strings = new ArrayList<>();
//        Set<ImageModel> productImages = product.getProductImages();
//        for (ImageModel image : productImages) {
//            String base64EncodedImage = Base64.getEncoder().encodeToString(image.getProductImage());
//            imageBase64Strings.add(base64EncodedImage);
//        }


            // Convert image byte array to Base64 string
            String base64EncodedImage = null;
            if (product.getProductImages() != null && product.getProductImages().length > 0) {
                base64EncodedImage = Base64.getEncoder().encodeToString(product.getProductImages());
            }

            return ProductDTO.builder()
                    .productId(product.getProductId())
                    .name(product.getName())
                    .availablequantity(product.getAvailablequantity())
                    .price(product.getPrice())
                    .costPrice(product.getCostPrice())
                    .category(product.getCategory())
                    .prodImage(product.getProductImages())
                    .build();
        }


}
