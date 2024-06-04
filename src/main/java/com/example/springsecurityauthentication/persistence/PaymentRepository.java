package com.example.springsecurityauthentication.persistence;

import com.example.springsecurityauthentication.persistence.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    boolean existsByZipcode(String zipcode);

    boolean existsByAddress(String address);

    boolean existsByIbanCardno(String ibanCardno);
}
