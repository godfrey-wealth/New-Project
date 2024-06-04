package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.DeleteUserUseCase;
import com.example.springsecurityauthentication.persistence.entity.User;
import com.example.springsecurityauthentication.persistence.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    @Autowired
    private UserRepository userRepository;


    @Override
    @Transactional
    public void deleteUser(Long id) {
        Optional<User> deleteUser = userRepository.findById(id);

        userRepository.deleteById(deleteUser.get().getId());

    }
}
