package com.dorolaw.member.service;

import com.dorolaw.consultation.repository.ReviewRepository;
import com.dorolaw.member.dto.common.LawyerProfileDto;
import com.dorolaw.member.dto.common.MemberProfileDto;
import com.dorolaw.member.dto.request.MyPageUpdateRequestDto;
import com.dorolaw.member.entity.lawyer.LawyerCareer;
import com.dorolaw.member.entity.lawyer.LawyerEducation;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

import static com.dorolaw.member.entity.MemberRole.CERTIFIED_LAWYER;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final LawyerProfileRepository lawyerProfileRepository;
    private final ReviewRepository reviewRepository;

    public Object getMemberInfo(String authorizationHeader){

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getUserIdFromJWT(extractToken));
        String memberRole = jwtTokenProvider.getRoleFromJWT(extractToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        MemberProfileDto baseProfile = MemberProfileDto.builder()
                .memberId(memberId)
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .joinDate(member.getCreatedAt().format(formatter))
                .profileImage(member.getProfileImage())
                .role(member.getRole().name())
                .build();

        if (memberRole.equals("GENERAL")) {
            return baseProfile.toGeneralProfile();
        } else if (memberRole.equals("LAWYER") || memberRole.equals("CERTIFIED_LAWYER")){
            LawyerProfileDto lawyerProfileDto = getLawyerAdditionalInfo(memberId);
            return baseProfile.toLawyerProfile(lawyerProfileDto);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    public Object updateMemberProfile(String authorizationHeader, MyPageUpdateRequestDto requestDto){

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getUserIdFromJWT(extractToken));
        String memberRole = jwtTokenProvider.getRoleFromJWT(extractToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        member.setName(requestDto.getName());
        member.setPhoneNumber(requestDto.getPhoneNumber());
        member.setProfileImage(requestDto.getProfileImage());

        if (memberRole.equals("LAWYER") || memberRole.equals("CERTIFIED_LAWYER")) {
            updateLawyerProfile(member, requestDto);
        }

        memberRepository.save(member);

        return getProfileResponse(member, memberRole);
    }

    private void updateLawyerProfile(Member member, MyPageUpdateRequestDto requestDto) {
        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(member.getMemberId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        lawyerProfile.parseAndSetAddress(requestDto.getOfficeAddress());

        lawyerProfile.updateProfile(
                requestDto.getOfficeName(),
                requestDto.getOfficePhoneNumber(),
                lawyerProfile.getOfficeProvince(),
                lawyerProfile.getOfficeCityDistrict(),
                lawyerProfile.getOfficeDetailedAddress(),
                requestDto.getGender(),
                requestDto.getSpecialties(),
                requestDto.getOneLineIntro(),
                requestDto.getGreetingMessage(),
                requestDto.getIntroVideo(),
                Long.parseLong(requestDto.getAccountNumber()),
                requestDto.getBankName()
        );

        updateEducations(lawyerProfile, requestDto);
        updateCareers(lawyerProfile, requestDto);

        lawyerProfileRepository.save(lawyerProfile);
    }

    private void updateEducations(LawyerProfile lawyerProfile, MyPageUpdateRequestDto requestDto) {

        lawyerProfile.getEducations().clear();

        // 새로운 교육 정보 추가
        if (requestDto.getEducations() != null) {
            requestDto.getEducations().forEach(eduDto -> {
                LawyerEducation education = LawyerEducation.builder()
                        .lawyerProfile(lawyerProfile)
                        .school(eduDto.getSchool())
                        .degree(eduDto.getDegree())
                        .graduationYear(eduDto.getGraduationYear())
                        .build();
                lawyerProfile.getEducations().add(education);
            });
        }
    }

    private void updateCareers(LawyerProfile lawyerProfile, MyPageUpdateRequestDto requestDto) {

        lawyerProfile.getCareers().clear();

        // 새로운 경력 정보 추가
        if (requestDto.getCareers() != null) {
            requestDto.getCareers().forEach(careerDto -> {
                LawyerCareer career = LawyerCareer.builder()
                        .lawyerProfile(lawyerProfile)
                        .company(careerDto.getCompany())
                        .position(careerDto.getPosition())
                        .years(careerDto.getYears())
                        .build();
                lawyerProfile.getCareers().add(career);
            });
        }
    }

    private Object getProfileResponse(Member member, String memberRole) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        MemberProfileDto baseProfile = MemberProfileDto.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .joinDate(member.getCreatedAt().format(formatter))
                .profileImage(member.getProfileImage())
                .role(member.getRole().name())
                .build();

        if (memberRole.equals("GENERAL")) {
            return baseProfile.toGeneralProfile();
        } else if (memberRole.equals("LAWYER") || memberRole.equals("CERTIFIED_LAWYER")) {
            LawyerProfileDto lawyerProfileDto = getLawyerAdditionalInfo(member.getMemberId());
            return baseProfile.toLawyerProfile(lawyerProfileDto);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    @Transactional
    public void verifyLawyer(String authorizationHeader){

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getUserIdFromJWT(extractToken));
        String memberRole = jwtTokenProvider.getRoleFromJWT(extractToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (memberRole.equals("CERTIFIED_LAWYER")){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        member.setRole(CERTIFIED_LAWYER);
        memberRepository.save(member);

        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(memberId)
                .orElseThrow(() ->  new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        lawyerProfile.verifiedLawyer();
        lawyerProfileRepository.save(lawyerProfile);
    }

    private LawyerProfileDto getLawyerAdditionalInfo(Long memberId) {
        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        Long reviewCount = reviewRepository.countByLawyerId(memberId);
        Float averageRating = reviewRepository.calculateAverageRatingByLawyerId(memberId);

        return LawyerProfileDto.builder()
                .lawyerId(memberId)
                .officeName(lawyerProfile.getOfficeName())
                .officePhoneNumber(lawyerProfile.getOfficePhoneNumber())
                .officeAddress(lawyerProfile.getFullOfficeAddress())
                .gender(lawyerProfile.getGender())
                .oneLineIntro(lawyerProfile.getShortIntroduction())
                .specialties(lawyerProfile.getSpecialties())
                .greetingMessage(lawyerProfile.getGreeting())
                .reviewCount(reviewCount)
                .averageRating(averageRating)
                .introVideo(lawyerProfile.getIntroductionVideoUrl())
                .education(lawyerProfile.getEducations().stream().map(edu ->
                        new LawyerProfileDto.EducationDto(edu.getSchool(), edu.getDegree(), edu.getGraduationYear())
                ).collect(Collectors.toList()))
                .career(lawyerProfile.getCareers().stream().map(career ->
                        new LawyerProfileDto.CareerDto(career.getCompany(), career.getPosition(), career.getYears())
                ).collect(Collectors.toList()))
                .lawyerLicenseNumber(lawyerProfile.getAttorneyLicenseNumber())
                .lawyerLicenseExam(lawyerProfile.getQualificationExam())
                .build();

    }
}