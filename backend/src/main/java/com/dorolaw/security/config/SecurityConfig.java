package com.dorolaw.security.config;

import com.dorolaw.security.auth.jwt.JwtAuthenticationFilter;
import com.dorolaw.security.auth.jwt.JwtAuthenticationSuccessHandler;
import com.dorolaw.security.auth.oauth.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthenticationSuccessHandler jwtAuthenticationSuccessHandler;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService,
                          JwtAuthenticationSuccessHandler jwtAuthenticationSuccessHandler) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.jwtAuthenticationSuccessHandler = jwtAuthenticationSuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF 비활성화
                .csrf(AbstractHttpConfigurer::disable)
                // JWT를 사용하므로 세션은 STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 모든 정적 리소스 및 기본 URL 허용
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        // 기본 OAuth2AuthorizationRequestResolver를 사용합니다.
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService)
                        )
                        .successHandler(jwtAuthenticationSuccessHandler)
                )
                // JWT 검증 필터 추가
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}

