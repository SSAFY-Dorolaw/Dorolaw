package com.dorolaw.security.oauth;

import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.MemberRole;
import com.dorolaw.member.entity.MemberSocialType;
import com.dorolaw.member.entity.MemberStatus;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// 카카오 개인정보 파싱해서 로그인 및 회원가입
@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final LawyerProfileRepository lawyerProfileRepository;

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

        // additionalParameters에서 role 값을 가져오기
        // 현재 요청에서 쿠키 가져오기
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Cookie[] cookies = request.getCookies();

        String roleString = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("oauth2_role".equals(cookie.getName())) {
                    roleString = cookie.getValue();
                    log.info("나의 롤!!!!: {}", roleString);
                    break;
                }
            }
        }
        log.info("나의 롤!!!!: {}", roleString);
        MemberRole role = "LAWYER".equalsIgnoreCase(roleString) ? MemberRole.LAWYER : MemberRole.GENERAL;

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
            if(MemberRole.LAWYER.equals(role)){
                LawyerProfile lawyerProfile = createInitialLawyerProfile(member);
                lawyerProfileRepository.save(lawyerProfile);
            }
        }

        // 인가정보 담기
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + member.getRole().name()));

        // 기존 OAuth2User의 attributes에 memberId와 role을 추가해서 반환
        Map<String, Object> customAttributes = new HashMap<>(oAuth2User.getAttributes());
        customAttributes.put("memberId", member.getMemberId());
        customAttributes.put("role", member.getRole().name());
        customAttributes.put("name", name);
        customAttributes.put("profileImage", profileImage);

        // 인증, 인가
        return new DefaultOAuth2User(authorities, customAttributes, "id");
    }

    private LawyerProfile createInitialLawyerProfile(Member member) {
        return LawyerProfile.builder()
                .member(member)
                .officeName("Default Office")
                .officePhoneNumber("000-0000-0000")
                .officeProvince("Default Province")
                .officeCityDistrict("Default District")
                .officeDetailedAddress("Default Address")
                .attorneyLicenseNumber("Default-0000")
                .isVerified(false)
                .accountNumber("Default Number")
                .bankName("Default Bank")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}
