package com.dorolaw.auth.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // memberId와 role 추출
        Long memberId = null;
        String role = null;
        String name = null;
        String profileImage = null;

        if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User oauthUser = (DefaultOAuth2User) authentication.getPrincipal();
            memberId = (Long) oauthUser.getAttributes().get("memberId"); // OAuth2User에서 memberId 가져오기
            role = (String) oauthUser.getAttributes().get("role"); // role 가져오기
            name = (String) oauthUser.getAttributes().get("name");
            profileImage = (String) oauthUser.getAttributes().get("profileImage");
        }

        if (memberId == null || role == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid authentication data");
            return;
        }

        // JWT 토큰 생성
        String token = jwtTokenProvider.generateToken(memberId, role);

        // JWT 토큰을 HTTP-only 쿠키에 저장
        Cookie jwtCookie = new Cookie("JWT_TOKEN", token);
        jwtCookie.setHttpOnly(true);
        // 운영 환경에서는 Secure 플래그를 true로 설정 (HTTPS 사용 시)
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        // 만료 시간(초 단위): 예를 들어 jwtTokenProvider에 설정된 만료시간 사용
        jwtCookie.setMaxAge((int)(jwtTokenProvider.getJwtExpirationInMs() / 1000));

        response.addCookie(jwtCookie);

        // JSON 응답으로 반환
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"profileImage\": \"" + profileImage + "\", \"role\": \"" + role + "\", \"name\": + \"" + name + "\"}");
        response.getWriter().flush();
    }
}