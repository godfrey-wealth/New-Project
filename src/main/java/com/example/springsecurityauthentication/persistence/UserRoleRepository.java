package com.example.springsecurityauthentication.persistence;

import com.example.springsecurityauthentication.persistence.entity.RoleEnum;
import com.example.springsecurityauthentication.persistence.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByName(RoleEnum name);
}
