package com.example.springsecurityauthentication.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "CardId")
    private Long id;

    private String firstname;
    private String address;

    private String zipcode;

    @NotBlank(message = "IBAN card number is required")
    @Length(min = 12, max = 18, message = "IBAN card number length must be between 12 and 18 characters")
    //@Pattern(regexp = "^NL\\d{2}INGB\\d{12}$", message = "Invalid IBAN card number format. It should start with 'NL' followed by 2 digits, 'INGB', and 12 digits.")
    private String ibanCardno;

    @Column(name="PayType")
    @Enumerated(EnumType.STRING)
    private PaymentType type;

    private double totalAmount;


    private String date;

    //public Long getId() {
//        return id;
//    }

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
