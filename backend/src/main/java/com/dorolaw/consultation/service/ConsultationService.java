package com.dorolaw.consultation.service;

import com.dorolaw.consultation.dto.request.ConsultationBookRequestDto;
import com.dorolaw.consultation.dto.request.AvailableTimesRequestDto;
import com.dorolaw.consultation.dto.request.ReviewWriteRequestDto;
import com.dorolaw.consultation.dto.response.ConsultationBookResponseDto;
import com.dorolaw.consultation.dto.response.AvailableTimesResponseDto;
import com.dorolaw.consultation.dto.response.ReviewResponseDto;
import com.dorolaw.consultation.dto.response.ReviewWriteResponseDto;
import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.entity.ConsultationStatus;
import com.dorolaw.consultation.entity.ConsultationType;
import com.dorolaw.consultation.entity.Review;
import com.dorolaw.consultation.repository.ConsultationRepository;
import com.dorolaw.consultation.repository.ReviewRepository;
import com.dorolaw.member.dto.common.LawyerProfileDto;
import com.dorolaw.member.dto.common.MemberProfileDto;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.member.entity.lawyer.LawyerSchedule;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.member.service.MemberService;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.entity.RequestStatus;
import com.dorolaw.request.repository.RequestRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final LawyerProfileRepository lawyerProfileRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ConsultationRepository consultationRepository;
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;
    private final RequestRepository requestRepository;

    public AvailableTimesResponseDto getAvailableTimes(
            Long lawyerId,
            String consultationDate){

        LocalDate date = LocalDate.parse(consultationDate);
        String dayOfWeek = date.getDayOfWeek().toString().substring(0, 3);

        LawyerProfile lawyer = lawyerProfileRepository.findByMember_MemberId(lawyerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        LawyerSchedule schedule = lawyer.getSchedules().stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        LocalTime startTime = getStartTimeForDay(schedule, dayOfWeek);
        LocalTime endTime = getEndTimeForDay(schedule, dayOfWeek);

        if (startTime == null || endTime == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        List<LocalTime> bookedTimes = consultationRepository.findBookedTimesByLawyerAndDate(
                lawyer.getLawyerProfileId(),
                date,
                ConsultationStatus.SCHEDULED
        );

        List<String> availableTimes = generateAvailableTimes(startTime, endTime, bookedTimes);

        return AvailableTimesResponseDto.builder()
                .lawyerId(lawyer.getLawyerProfileId())
                .AvailableTimes(Arrays.asList(
                        AvailableTimesResponseDto.AvailableTimesDto.builder()
                                .date(date.toString())
                                .Times(availableTimes)
                                .build()
                ))
                .build();
    }

    @Transactional
    public ConsultationBookResponseDto bookConsultation(String authorizationHeader, ConsultationBookRequestDto requestDto){

        LawyerProfile lawyer = lawyerProfileRepository.findByMember_MemberId(requestDto.getLawyerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
        Member client = memberRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        Request request = requestRepository.findById(requestDto.getRequestId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        if (!request.getMember().getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        request.setStatus(RequestStatus.SCHEDULED);
        requestRepository.save(request);

        // 상담 생성
        Consultation consultation = Consultation.builder()
                .request(request)
                .lawyer(lawyer)
                .client(client)
                .consultationDate(LocalDate.parse(requestDto.getScheduledDate()))
                .scheduledTime(LocalTime.parse(requestDto.getScheduledTime()))
                .consultationType(ConsultationType.valueOf(requestDto.getConsultationType()))
                .price(requestDto.getPrice())
                .additionalQuestion(requestDto.getAdditionalQuestion())
                .status(ConsultationStatus.SCHEDULED)
                .build();

        consultationRepository.save(consultation);

        return ConsultationBookResponseDto.builder()
                .consultationId(consultation.getConsultationId())
                .requestId(request.getRequestId())
                .status(consultation.getStatus().name())
                .scheduledDate(consultation.getConsultationDate() + " " + consultation.getScheduledTime())
                .lawyer(ConsultationBookResponseDto.LawyerInfo.builder()
                        .lawyerId(lawyer.getLawyerProfileId())
                        .name(lawyer.getMember().getName())
                        .build())
                .client(ConsultationBookResponseDto.ClientInfo.builder()
                        .clientId(client.getMemberId())
                        .name(client.getName())
                        .build())
                .build();
    }

    @Transactional
    public ReviewWriteResponseDto writeReview(ReviewWriteRequestDto requestDto){

        Consultation consultation = consultationRepository.findById(requestDto.getConsultationId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        LawyerProfile lawyer = lawyerProfileRepository.findByMember_MemberId(requestDto.getLawyerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        Review review = Review.builder()
                .consultation(consultation)
                .lawyer(lawyer.getMember())
                .client(consultation.getClient())
                .rating(requestDto.getRating())
                .content(requestDto.getComment())
                .build();

        reviewRepository.save(review);

        return ReviewWriteResponseDto.builder()
                .reviewId(review.getReviewId())
                .createdAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
    }

    public ReviewResponseDto getReviews(Long consultationId) {

        Review review = reviewRepository.findByConsultation_ConsultationId(consultationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId())
                .consultationId(review.getConsultation().getConsultationId())
                .lawyerId(review.getLawyer().getMemberId())
                .lawyerName(review.getLawyer().getName())
                .clientName(review.getClient().getName())
                .rating(review.getRating())
                .content(review.getContent())
                .createdAt(review.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
    }

    private LocalTime getStartTimeForDay(LawyerSchedule schedule, String dayOfWeek) {
        return switch (dayOfWeek.toUpperCase()) {
            case "MON" -> schedule.getMondayStartTime();
            case "TUE" -> schedule.getTuesdayStartTime();
            case "WED" -> schedule.getWednesdayStartTime();
            case "THU" -> schedule.getThursdayStartTime();
            case "FRI" -> schedule.getFridayStartTime();
            case "SAT" -> schedule.getSaturdayStartTime();
            case "SUN" -> schedule.getSundayStartTime();
            default -> null;
        };
    }

    private LocalTime getEndTimeForDay(LawyerSchedule schedule, String dayOfWeek) {
        return switch (dayOfWeek.toUpperCase()) {
            case "MON" -> schedule.getMondayEndTime();
            case "TUE" -> schedule.getTuesdayEndTime();
            case "WED" -> schedule.getWednesdayEndTime();
            case "THU" -> schedule.getThursdayEndTime();
            case "FRI" -> schedule.getFridayEndTime();
            case "SAT" -> schedule.getSaturdayEndTime();
            case "SUN" -> schedule.getSundayEndTime();
            default -> null;
        };
    }

    private List<String> generateAvailableTimes(LocalTime startTime, LocalTime endTime, List<LocalTime> bookedTimes) {
        List<String> availableTimes = new ArrayList<>();
        LocalTime currentTime = startTime;

        while (currentTime.isBefore(endTime)) {
            LocalTime nextTime = currentTime.plusMinutes(30);

            // 30분 단위로 예약 가능한 시간 확인
            if (!isTimeBooked(currentTime, bookedTimes)) {
                availableTimes.add(currentTime.format(DateTimeFormatter.ofPattern("HH:mm")));
            }
            currentTime = nextTime;
        }
        return availableTimes;
    }

    private boolean isTimeBooked(LocalTime timeToCheck, List<LocalTime> bookedTimes) {
        return bookedTimes.stream()
                .anyMatch(bookedTime ->
                        bookedTime.equals(timeToCheck) ||
                                (bookedTime.isAfter(timeToCheck) && bookedTime.isBefore(timeToCheck.plusMinutes(30)))
                );
    }

    public Object getMemberInfo(Long memberId){

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        String memberRole = member.getRole().name();

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
            LawyerProfileDto lawyerProfileDto = memberService.getLawyerAdditionalInfo(memberId);
            return baseProfile.toLawyerProfile(lawyerProfileDto);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
