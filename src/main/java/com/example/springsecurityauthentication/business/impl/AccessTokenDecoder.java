package com.example.springsecurityauthentication.business.impl;


import com.example.springsecurityauthentication.dto.AccessTokenDTO;

public interface AccessTokenDecoder {
    AccessTokenDTO decode(String accessTokenEncoded);
}
