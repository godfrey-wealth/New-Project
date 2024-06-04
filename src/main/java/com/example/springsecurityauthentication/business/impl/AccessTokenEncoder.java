package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.AccessTokenDTO;

public interface AccessTokenEncoder {
    String encode(AccessTokenDTO accessToken);
}
