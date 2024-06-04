package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.SignUpUseCase;
import com.example.springsecurityauthentication.config.exception.AlreadyExistsExceptionMessage;
import com.example.springsecurityauthentication.configuration.exception.ExceptionMessage;
import com.example.springsecurityauthentication.dto.SignUpRequestDTO;
import com.example.springsecurityauthentication.dto.SignUpResponseDTO;
import com.example.springsecurityauthentication.persistence.entity.RoleEnum;
import com.example.springsecurityauthentication.persistence.entity.User;
import com.example.springsecurityauthentication.persistence.UserRepository;
import com.example.springsecurityauthentication.persistence.entity.UserRole;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

;

@Service
@RequiredArgsConstructor
public class SignUpUseCaseImpl implements SignUpUseCase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public SignUpResponseDTO signUp(SignUpRequestDTO request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new AlreadyExistsExceptionMessage();
        }
        else if(userRepository.existsByUsername(request.getUsername()))
        {
            throw new  AlreadyExistsExceptionMessage();
        }
        else if(userRepository.existsByFirstname(request.getFirstname()))
        {
            throw new  AlreadyExistsExceptionMessage();
        }
        else if(userRepository.existsByLastname(request.getLastname()))
        {
            throw new  AlreadyExistsExceptionMessage();
        }

        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new ExceptionMessage();
        }
        User savedUser = saveNewUser(request);

        return SignUpResponseDTO.builder()
                .userId(savedUser.getId())
                .build();


    }


    private User saveNewUser(SignUpRequestDTO request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());


        // countryEntity.
        User newUser = User.builder()

        .email(request.getEmail()).firstname(request.getFirstname()).lastname(request.getLastname())
                .username(request.getUsername()) .password(encodedPassword)
                .build();
        newUser.setUserRoles(Set.of(UserRole.builder().user(newUser).name(RoleEnum.CUSTOMER).build()));
        return userRepository.save(newUser);
    }

}
