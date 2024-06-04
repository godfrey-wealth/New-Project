package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.AccessTokenEncoder;
import com.example.springsecurityauthentication.business.impl.LoginUseCase;
import com.example.springsecurityauthentication.config.exception.InvalidCredentialsException;
import com.example.springsecurityauthentication.dto.AccessTokenDTO;
import com.example.springsecurityauthentication.dto.LoginRequestDTO;
import com.example.springsecurityauthentication.dto.LoginResponseDTO;
import com.example.springsecurityauthentication.persistence.entity.User;
import com.example.springsecurityauthentication.persistence.UserRepository;
import com.example.springsecurityauthentication.persistence.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginUseCaseImpl implements LoginUseCase {
    private final UserRepository userRepository;
    private final AccessTokenEncoder accessTokenEncoder;
    private final PasswordEncoder passwordEncoder;

    private final UserRoleRepository userRoleRepository;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {


        User user = userRepository.findByEmail(request.getEmail());


        if (user == null) {
            throw new InvalidCredentialsException();
        }


        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }



          List<String>  roles = user.getUserRoles().stream().map(userRole -> userRole.getName().toString()).toList();
            Long userId = user != null ? user.getId() : null;
            roles = user.getUserRoles().stream().map(userRole -> userRole.getName().toString()).toList();

            String accessToken = accessTokenEncoder.encode(AccessTokenDTO.builder().subject(user.getEmail()).userId(userId)
                    .roles(roles).build());

            return LoginResponseDTO.builder().roles(roles).accessToken(accessToken).build();
        }


    }


















