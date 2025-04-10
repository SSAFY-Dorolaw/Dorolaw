package com.dorolaw.superAdmin;

import com.dorolaw.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/superAdmin")
@RequiredArgsConstructor
public class Controller {

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @GetMapping("/general")
    public void generateGeneralToken(HttpServletResponse response) throws IOException {
        String token = jwtTokenProvider.generateToken(6L, "GENERAL");
        response.sendRedirect(frontendUrl + "/login/redirect?token=" + token);
    }

    @GetMapping("/lawyer")
    public void generateLawyerToken(HttpServletResponse response) throws IOException {
        String token = jwtTokenProvider.generateToken(7L, "CERTIFIED_LAWYER");
        response.sendRedirect(frontendUrl + "/login/redirect?token=" + token);
    }
}
