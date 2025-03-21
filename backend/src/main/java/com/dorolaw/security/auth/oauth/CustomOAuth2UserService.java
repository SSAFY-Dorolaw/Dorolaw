package com.dorolaw.security.auth.oauth;

import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.MemberRole;
import com.dorolaw.member.entity.MemberSocialType;
import com.dorolaw.member.entity.MemberStatus;
import com.dorolaw.member.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import java.util.*;

// 카카오 개인정보 파싱해서 로그인 및 회원가입
@Service
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 카카오에서 사용자 데이터 가져오기
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Long socialId = Long.valueOf(attributes.get("id").toString());
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String email = (String) kakaoAccount.get("email");
        String name = (String) kakaoAccount.get("name");
        String phoneNumber = (String) kakaoAccount.get("phone_number");
        String profileImage = (String) profile.get("profile_image_url");

        log.info("socialId: " + socialId);
        log.info("email: " + email);
        log.info("name: " + name);
        log.info("phoneNumber: " + phoneNumber);
        log.info("profileImage: " + profileImage);

        // 쿠키에서 role 값을 읽어오기
        String roleString = "";
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("role".equals(cookie.getName())) {
                    roleString = cookie.getValue();
                    break;
                }
            }
        }
        MemberRole role = "LAWYER".equalsIgnoreCase(roleString) ? MemberRole.LAWYER : MemberRole.GENERAL;
        log.info("role from cookie: {}", roleString);

        // 회원가입 여부 확인
        Optional<Member> existingMember = memberRepository.findBySocialId(socialId);
        Member member;

        if (existingMember.isPresent()) {   // 회원가입 한 경우
            member = existingMember.get();
        } else { // 회원가입 안한 경우 - 회원가입
            member = new Member();
            member.setSocialId(socialId);
            member.setEmail(email);
            member.setName(name);
            member.setPhoneNumber(phoneNumber);
            member.setProfileImage(profileImage);
            member.setSocialType(MemberSocialType.KAKAO);
            member.setRole(role);
            member.setStatus(MemberStatus.ACTIVE);
            memberRepository.save(member);
        }
        
        // 인가정보 담기
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + member.getRole().name()));

        // 기존 OAuth2User의 attributes에 memberId와 role을 추가해서 반환
        Map<String, Object> customAttributes = new HashMap<>(oAuth2User.getAttributes());
        customAttributes.put("memberId", socialId);
        customAttributes.put("role", role.name());
        customAttributes.put("name", name);
        customAttributes.put("profileImage", profileImage);
        
        // 인증, 인가
        return new DefaultOAuth2User(authorities, customAttributes, "id");
    }
}
