package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.GetUsersUseCase;
import com.example.springsecurityauthentication.dto.GetAllUsersRequestDTO;
import com.example.springsecurityauthentication.dto.GetUsersResponseDTO;
import com.example.springsecurityauthentication.dto.UserDTO;
import com.example.springsecurityauthentication.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetUsersUseCaseImpl implements GetUsersUseCase {
    private final UserRepository userRepository;

//    @Override
//    public GetUsersResponseDTO getUsers() {
//        return null;
//    }

    @Override
    public GetUsersResponseDTO getUsers(GetAllUsersRequestDTO requestDTO) {


        List<UserDTO> users = userRepository.findAll()
                .stream()
                .map(UserDTOConverter::convertUserToDTO)
                .toList();

        return GetUsersResponseDTO.builder().users(users).build();
    }
}
