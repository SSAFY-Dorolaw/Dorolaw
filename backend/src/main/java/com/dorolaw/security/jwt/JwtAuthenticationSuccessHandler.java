package com.dorolaw.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class JwtAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    @Value("${app.frontend.url}")
    private String frontendUrl;

    public JwtAuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // memberId와 role 추출
        Long memberId = null;
        String role = null;
        String profileImage = null;

        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User oauthUser = (DefaultOAuth2User) authentication.getPrincipal();
            memberId = (Long) oauthUser.getAttributes().get("memberId"); // OAuth2User에서 memberId 가져오기
            role = (String) oauthUser.getAttributes().get("role"); // role 가져오기
            profileImage = (String) oauthUser.getAttributes().get("profileImage");
        }

        if (memberId == null || role == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid authentication data");
            return;
        }

        // JWT 토큰 생성
        String token = jwtTokenProvider.generateToken(memberId, role);

        String redirectUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                .path("/login/redirect") // 프론트엔드의 콜백 경로
                .queryParam("token", token)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}