package com.example.springsecurityauthentication.persistence;


import com.example.springsecurityauthentication.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//
public boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByFirstname(String firstname);
    boolean existsByLastname(String lastname);

    boolean existsById(Long userId);

    User getUserByUsername(String username);
    User getUserByPassword(String password);

   // User getCustomerByFirstnameAndLastnameAndEmailAndUsernameAndPasswordAndRole(String email, String firstname, String lastname, String username, String password, UserRole role);

    User findByEmail(String email);

    @Override
    Optional<User> findById(Long userId);

    //    @Query(value = "SELECT * FROM base_hit_ticket.user", nativeQuery = true)
//    List<User> getAllUsers();
//
//    @Query("select u from User u where u.email = ?1 and u.password = ?2")
//    User getUserByEmailAndPassword(String email, String password);
//
//    User findByEmailAndPassword(String email, String password);
//
//    User findByEmail(String email);
//
//    User findUserById(Long id);
//@Query("SELECT  ")

}
