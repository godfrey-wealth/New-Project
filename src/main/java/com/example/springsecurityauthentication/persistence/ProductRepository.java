package com.example.springsecurityauthentication.persistence;


import com.example.springsecurityauthentication.persistence.entity.Category;
import com.example.springsecurityauthentication.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public boolean existsByName(String name);
    Product findByName(String name);

   // Product findUserById(Long id);

    boolean existsByAvailablequantity(int availablequantity);

    boolean existsByCategory(Category category);

    boolean existsByPrice(double price);

}
