package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.UserIdValidator;
import com.example.springsecurityauthentication.configuration.exception.InvalidUserException;
import com.example.springsecurityauthentication.persistence.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserIdValidatorImpl implements UserIdValidator {
    private final UserRepository userRepository;

    @Override
    public void validateId(Long userId) {
        if (userId == null || !userRepository.existsById(userId)) {
            throw new InvalidUserException("ALL_EXISTS");
        }
    }
}
