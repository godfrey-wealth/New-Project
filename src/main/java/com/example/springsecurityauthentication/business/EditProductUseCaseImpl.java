//package com.example.springsecurityauthentication.business;
//
//
//import com.example.springsecurityauthentication.business.impl.EditProductUseCase;
//import com.example.springsecurityauthentication.config.exception.ProductNotFoundWithThatIDException;
//import com.example.springsecurityauthentication.dto.EditProductRequestDTO;
//import com.example.springsecurityauthentication.persistence.ProductRepository;
//import com.example.springsecurityauthentication.persistence.entity.ImageModel;
//import com.example.springsecurityauthentication.persistence.entity.Product;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.Set;
//
//@Service
//@RequiredArgsConstructor
//public class EditProductUseCaseImpl implements EditProductUseCase {
//    private final ProductRepository productRepository;
//
//    @Override
//    public Product EditProduct(EditProductRequestDTO request, Long Id, MultipartFile[] images) {
//
//        return productRepository.findById(Id)
//                .map(product -> {
//                    // Update product details
//                    product.setName(request.getName());
//                    product.setAvailablequantity(request.getAvailablequantity());
//                    product.setPrice(request.getPrice());
//                    product.setCostPrice(request.getCostPrice());
//                    product.setCategory(request.getCategory());
//
//                    // Update product image if needed
//                    //updateProductImage(product, request.getImages());
//
//                    // Save the updated product
//                    return productRepository.save(product);
//                })
//                .orElseThrow(() -> new ProductNotFoundWithThatIDException(Id));
//    }
//
//    // Method to update the image of the product
//    private void updateProductImage(Product product, MultipartFile[] images) {
//        if (images != null && images.length > 0) {
//            try {
//                Set<ImageModel> imageModels = imageUploadService.uploadImage(images);
//                product.setProductImages(imageModels);
//            } catch (IOException e) {
//                // Handle IOException
//                e.printStackTrace(); // For example, you might want to log the error
//            }
//        }
//
//}
//
//
//

package com.example.springsecurityauthentication.business;

import com.example.springsecurityauthentication.business.impl.EditProductUseCase;
import com.example.springsecurityauthentication.config.exception.ProductNotFoundWithThatIDException;
import com.example.springsecurityauthentication.dto.EditProductRequestDTO;
import com.example.springsecurityauthentication.persistence.ProductRepository;
import com.example.springsecurityauthentication.persistence.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EditProductUseCaseImpl implements EditProductUseCase {
    private final ProductRepository productRepository;
    //private final ImageRepository imageRepository;

    @Override
    public Product EditProduct(EditProductRequestDTO request, Long id, MultipartFile file) {
        return productRepository.findById(id)
                .map(product -> {
                    // Update product details
                    product.setName(request.getName());
                    product.setAvailablequantity(request.getAvailablequantity());
                    product.setPrice(request.getPrice());
                    product.setCostPrice(request.getCostPrice());
                    product.setCategory(request.getCategory());

                    // Check if file is not null and update product images
                    if (file != null) {
                        try {
                            product.setProductImages(file.getBytes());
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to update product images", e);
                        }
                    }

                    // Save the updated product
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new ProductNotFoundWithThatIDException(id));
    }
    // Method to upload the image and return a set of ImageModel
//    private Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
//        Set<ImageModel> imageModels = new HashSet<>();
//
//        for (MultipartFile file : multipartFiles) {
//            ImageModel imageModel = new ImageModel(
//                    file.getOriginalFilename(),
//                    file.getContentType(),
//                    file.getBytes()
//            );
//            imageModels.add(imageModel);
//        }
//
//        return imageModels;
//    }
}


