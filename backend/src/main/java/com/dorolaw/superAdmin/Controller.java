package com.dorolaw.superAdmin;

import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/superAdmin")
@RequiredArgsConstructor
public class Controller {

    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/general")
    public ResponseEntity<TokenDto> generateGeneralToken() {
        String token = jwtTokenProvider.generateToken(6L, "GENERAL");
        return ResponseEntity.ok(new TokenDto(token));
    }

    @GetMapping("/lawyer")
    public ResponseEntity<TokenDto> generateLawyerToken() {
        String token = jwtTokenProvider.generateToken(7L, "CERTIFIED_LAWYER");
        return ResponseEntity.ok(new TokenDto(token));
    }
}
