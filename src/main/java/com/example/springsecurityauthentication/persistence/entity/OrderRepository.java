package com.example.springsecurityauthentication.persistence.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    boolean existsByOrderDescription(String orderDescription);

    boolean existsById(Long orderId);


    Optional<Order> findByIdAndUserId(Long orderId, Long userId);
}
