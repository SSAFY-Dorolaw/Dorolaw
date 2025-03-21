package com.dorolaw.security.auth.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller // FIXME @RestController로 추후 변경
@RequestMapping("/api/members")
public class AuthController {

    @GetMapping("/")
    public String index() {
        return "index"; // templates/index.html 을 생성하거나, 기본 페이지로 사용
    }

    // JWT로 보호되는 API 예제
    @GetMapping("/home")
    @ResponseBody
    public ResponseEntity<?> home(@AuthenticationPrincipal Object principal) {
        return ResponseEntity.ok("Authenticated user info: " + principal);
    }

    @GetMapping("/order")
    public String order() {
        return "orderform"; // templates/index.html 을 생성하거나, 기본 페이지로 사용
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // JWT_TOKEN 쿠키 삭제
        Cookie jwtCookie = new Cookie("JWT_TOKEN", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);  // 운영 환경에서는 true로 설정 필요
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        // role 쿠키 삭제
        Cookie roleCookie = new Cookie("role", null);
        roleCookie.setPath("/");
        roleCookie.setMaxAge(0);
        response.addCookie(roleCookie);

        return ResponseEntity.ok("Logged out successfully");
    }
}
