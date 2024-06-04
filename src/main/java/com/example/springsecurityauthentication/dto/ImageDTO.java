package com.example.springsecurityauthentication.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ImageDTO {



        private Long id;
        private String name;
        private String type;
        private String base64EncodedImage; // Assuming you want to include Base64 encoded image data
    private Set<ImageDTO> imageDTOs; // Collection of ImageDTO objects

    public ImageDTO(Long id, String name, String type, String base64EncodedImage) {
    }
    // Getters and setters
        // You may also include other necessary constructors and methods

    // Constructors, getters, and setters


    }



