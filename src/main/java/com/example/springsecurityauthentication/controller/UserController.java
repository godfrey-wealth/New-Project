package com.example.springsecurityauthentication.controller;


import com.example.springsecurityauthentication.business.impl.*;
import com.example.springsecurityauthentication.config.exception.userNotFoundException;
import com.example.springsecurityauthentication.dto.*;
import com.example.springsecurityauthentication.security.auth.isauthenticated.isAuthenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
public class UserController {
    private final GetUsersUseCase getUsersUseCase;
    private final SignUpUseCase signUpUseCase;
        private final DeleteUserUseCase deleteUserUseCase;
    private final EditUserUseCase editUserUseCase;
    private final LoginUseCase loginUseCase;
    private final GetUserUseCase getUserUseCase;

   // private final  AccessTokenEncoder accessTokenEncoder;

    private final AccessTokenDTO accessTokenDTO;




    @GetMapping
    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<GetUsersResponseDTO> getUsers(GetAllUsersRequestDTO request) {
        return ResponseEntity.ok(getUsersUseCase.getUsers(request));
    }

    @PostMapping("/register")
    public ResponseEntity<SignUpResponseDTO> createUser(
            @RequestBody @Valid SignUpRequestDTO request) {
        SignUpResponseDTO response = signUpUseCase.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }



    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody @Valid LoginRequestDTO request){
        LoginResponseDTO response = loginUseCase.login(request);
        return ResponseEntity.ok(response);
//        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN","ROLE_SALES_MANAGER", "ROLE_CUSTOMER"})
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUser()throws userNotFoundException {//@PathVariable(value = "id") final long id
       final Optional<UserDTO> userOptional = getUserUseCase.getUser(accessTokenDTO.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok().body(userOptional.get()); //ResponseEntity.ok().body(userOptional.get());
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})
    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getUserById()throws userNotFoundException {//@PathVariable(value = "id") final long id
        final Optional<UserDTO> userOptional = getUserUseCase.getUser(accessTokenDTO.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok().body(userOptional.get()); //ResponseEntity.ok().body(userOptional.get());
    }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN","ROLE_SALES_MANAGER", "ROLE_CUSTOMER"})
    @PutMapping("/update/profile")
    public ResponseEntity<UserDTO> updateStudent( @RequestBody @Valid EditUserRequestDTO request) {
       request.setId(accessTokenDTO.getUserId());
        editUserUseCase.editUser(request);
        return ResponseEntity.noContent().build();
    }
//    public User updateUser(@RequestBody @Valid EditUserRequestDTO request, @PathVariable Long id){
////        User response = editUserUseCase.editUser(request,id);
////
////        return new ResponseEntity<>(editUserUseCase) ResponseEntity.ok().body(HttpStatus.CREATED);
//
//        return editUserUseCase.editUser(request, id);
//    }

    @isAuthenticated
    @RolesAllowed({"ROLE_ADMIN"})
    @DeleteMapping("/{id}")//not working
    public ResponseEntity deleteUser(@PathVariable Long id){
        deleteUserUseCase.deleteUser(id);
        return ResponseEntity.ok().build();
    }

}

//    @PathVariable("id") long id