package com.dorolaw.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private Key key;

    @Getter
    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;

    @PostConstruct
    public void init() {
        // jwtSecret이 주입된 후에 키를 생성합니다.
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // memberId와 role을 포함한 JWT 생성
    public String generateToken(Long memberId, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(String.valueOf(memberId))  // 여기서 authentication.getName()는 "id" attribute 값
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // JWT에서 memberId 추출
    public String getUserIdFromJWT(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    // JWT에서 role 추출
    public String getRoleFromJWT(String token) {
        Claims claims = parseClaims(token);
        return claims.get("role", String.class);
    }

    // JWT 파싱 및 Claims 반환
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // JWT 유효성 검증
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public String extractToken(String authorizationHeader){
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            // 에러메세지 추가
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return authorizationHeader.substring(7);
    }

}
