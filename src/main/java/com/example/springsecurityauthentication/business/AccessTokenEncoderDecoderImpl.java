package com.example.springsecurityauthentication.business;


import com.example.springsecurityauthentication.business.impl.AccessTokenDecoder;
import com.example.springsecurityauthentication.business.impl.AccessTokenEncoder;
import com.example.springsecurityauthentication.config.exception.InvalidAccessTokenException;
import com.example.springsecurityauthentication.dto.AccessTokenDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccessTokenEncoderDecoderImpl implements AccessTokenEncoder, AccessTokenDecoder {
    private Key key;

    public AccessTokenEncoderDecoderImpl(@Value("E91E158E4C6656F68B1B5D1C316766DE98D2AD6EF3BFB44F78E9CFCDF5") String secretKey){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public AccessTokenDTO decode(String accessTokenEncoded) {
        try{
            Jwt jwt = Jwts.parserBuilder().setSigningKey(key).build().parse(accessTokenEncoded);
            Claims claims = (Claims) jwt.getBody();

            List<String> roles = claims.get("roles", List.class);

            return AccessTokenDTO.builder().subject(claims.getSubject()).roles(roles)
                    .userId(claims.get("userId", Long.class)).build();
        }
        catch (JwtException ex){
            throw new InvalidAccessTokenException(ex.getMessage());
        }
    }

    @Override
    public String encode(AccessTokenDTO accessToken) {
        Map<String, Object> claimsMap = new HashMap<>();
        if(!CollectionUtils.isEmpty(accessToken.getRoles())){
            claimsMap.put("roles", accessToken.getRoles());
        }
        if(accessToken.getUserId() != null){
            claimsMap.put("userId", accessToken.getUserId());
        }

        Instant now = Instant.now();
        return Jwts.builder().setSubject(accessToken.getSubject()).setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(30, ChronoUnit.MINUTES)))
                .addClaims(claimsMap).signWith(key).compact();
    }
}
