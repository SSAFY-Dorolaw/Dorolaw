package com.dorolaw.member.service;

import com.dorolaw.member.dto.request.LawyerBusinessHourRequestDto;
import com.dorolaw.consultation.repository.ReviewRepository;
import com.dorolaw.member.dto.common.LawyerProfileDto;
import com.dorolaw.member.dto.common.MemberProfileDto;
import com.dorolaw.member.dto.request.MyPageUpdateRequestDto;
import com.dorolaw.member.entity.lawyer.*;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.LawyerScheduleRepository;
import com.dorolaw.member.repository.LawyerTagRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static com.dorolaw.member.entity.MemberRole.CERTIFIED_LAWYER;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final LawyerProfileRepository lawyerProfileRepository;
    private final ReviewRepository reviewRepository;
    private final LawyerScheduleRepository lawyerScheduleRepository;
    private final LawyerTagRepository lawyerTagRepository;

        public Object getMemberInfo(String authorizationHeader){

            String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
            Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
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
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
        String memberRole = jwtTokenProvider.getRoleFromJWT(extractToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (requestDto.getPhoneNumber() != null) {
            member.setPhoneNumber(requestDto.getPhoneNumber());
        }

        if (requestDto.getProfileImage() != null) {
            member.setProfileImage(requestDto.getProfileImage());
        }

        if (memberRole.equals("LAWYER") || memberRole.equals("CERTIFIED_LAWYER")) {
            updateLawyerProfile(member, requestDto);
        }

        memberRepository.save(member);

        return getProfileResponse(member, memberRole);
    }

    private void updateLawyerProfile(Member member, MyPageUpdateRequestDto requestDto) {
        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(member.getMemberId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        // 주소 처리 - 주소가 제공된 경우에만 파싱 수행
        if (requestDto.getOfficeAddress() != null) {
            lawyerProfile.parseAndSetAddress(requestDto.getOfficeAddress());
        }

        // 기존 필드 값들을 먼저 가져옴
        String officeName = lawyerProfile.getOfficeName();
        String officePhoneNumber = lawyerProfile.getOfficePhoneNumber();
        String officeProvince = lawyerProfile.getOfficeProvince();
        String officeCityDistrict = lawyerProfile.getOfficeCityDistrict();
        String officeDetailedAddress = lawyerProfile.getOfficeDetailedAddress();
        String gender = lawyerProfile.getGender();
        String oneLineIntro = lawyerProfile.getShortIntroduction();
        String greetingMessage = lawyerProfile.getGreeting();
        String introVideo = lawyerProfile.getIntroductionVideoUrl();
        Long accountNumber = lawyerProfile.getAccountNumber();
        String bankName = lawyerProfile.getBankName();

        if (requestDto.getOfficeName() != null) {
            officeName = requestDto.getOfficeName();
        }

        if (requestDto.getOfficePhoneNumber() != null) {
            officePhoneNumber = requestDto.getOfficePhoneNumber();
        }

        if (requestDto.getGender() != null) {
            gender = requestDto.getGender();
        }

        if (requestDto.getOneLineIntro() != null) {
            oneLineIntro = requestDto.getOneLineIntro();
        }

        if (requestDto.getGreetingMessage() != null) {
            greetingMessage = requestDto.getGreetingMessage();
        }

        if (requestDto.getIntroVideo() != null) {
            introVideo = requestDto.getIntroVideo();
        }

        if (requestDto.getAccountNumber() != null) {
            accountNumber = Long.parseLong(requestDto.getAccountNumber());
        }

        if (requestDto.getBankName() != null) {
            bankName = requestDto.getBankName();
        }

        // 모든 필드를 updateProfile 메소드에 전달
        lawyerProfile.updateProfile(
                officeName,
                officePhoneNumber,
                officeProvince,
                officeCityDistrict,
                officeDetailedAddress,
                gender,
                oneLineIntro,
                greetingMessage,
                introVideo,
                accountNumber,
                bankName
        );

        if (requestDto.getEducations() != null) {
            updateEducations(lawyerProfile, requestDto);
        }

        if (requestDto.getCareers() != null) {
            updateCareers(lawyerProfile, requestDto);
        }

        if (requestDto.getSpecialties() != null) {
            updateLawyerSpecialties(member, requestDto.getSpecialties());
        }

        lawyerProfileRepository.save(lawyerProfile);
    }


    private void updateLawyerSpecialties(Member lawyer, List<LawyerSpeciality> specialties) {
        // 기존 태그 삭제
        lawyerTagRepository.deleteByLawyerId(lawyer);

        // 새로운 태그 추가
        if (specialties != null && !specialties.isEmpty()) {
            List<LawyerTag> lawyerTags = specialties.stream()
                    .map(specialty -> LawyerTag.builder()
                            .lawyerSpeciality(specialty)
                            .lawyerId(lawyer)
                            .build())
                    .collect(Collectors.toList());

            lawyerTagRepository.saveAll(lawyerTags);
        }
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
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
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

        Member lawyer = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        Long reviewCount = reviewRepository.countByLawyerId(memberId);
        Float averageRating = reviewRepository.calculateAverageRatingByLawyerId(memberId);

        List<LawyerTag> lawyerTags = lawyerTagRepository.findByLawyerId(lawyer);
        List<LawyerProfileDto.LawyerTagDto> lawyerTagDtos = new ArrayList<>();

        if (lawyerTags != null && !lawyerTags.isEmpty()) {
            lawyerTagDtos = lawyerTags.stream()
                    .map(tag -> LawyerProfileDto.LawyerTagDto.builder()
                            .lawyer_specialties(tag.getLawyerSpeciality().name())
                            .build())
                    .collect(Collectors.toList());
        }

        return LawyerProfileDto.builder()
                .lawyerId(memberId)
                .officeName(lawyerProfile.getOfficeName())
                .officePhoneNumber(lawyerProfile.getOfficePhoneNumber())
                .officeAddress(lawyerProfile.getFullOfficeAddress())
                .gender(lawyerProfile.getGender())
                .oneLineIntro(lawyerProfile.getShortIntroduction())
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
                .lawyerTags(lawyerTagDtos)
                .build();

    }


    @Transactional
    public void setLawyerBusinessTimes(String authorizationHeader, LawyerBusinessHourRequestDto request){

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        // JWT 실시간 반영시 주석 해제
//        String memberRole = (String) memberInfo.get("memberRole");
//        if (!memberRole.equals("CERTIFIED_LAWYER")){
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
//        }

        LawyerProfile lawyer = lawyerProfileRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        LawyerSchedule schedule = lawyer.getSchedules().stream()
                .findFirst()
                .orElse(LawyerSchedule.builder().lawyerProfile(lawyer).build());

        schedule.updateSchedule(
                request.getMonday_start_time(),
                request.getMonday_end_time(),
                request.getTuesday_start_time(),
                request.getTuesday_end_time(),
                request.getWednesday_start_time(),
                request.getWednesday_end_time(),
                request.getThursday_start_time(),
                request.getThursday_end_time(),
                request.getFriday_start_time(),
                request.getFriday_end_time(),
                request.getSaturday_start_time(),
                request.getSaturday_end_time(),
                request.getSunday_start_time(),
                request.getSunday_end_time()
        );
        lawyerScheduleRepository.save(schedule);
    }
}