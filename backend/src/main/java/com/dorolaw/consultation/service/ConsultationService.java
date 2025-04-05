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
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.member.entity.lawyer.LawyerSchedule;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    public AvailableTimesResponseDto getAvailableTimes(
            Long lawyerId,
            AvailableTimesRequestDto availableTimesRequestDto){

        LawyerProfile lawyer = lawyerProfileRepository.findByMember_MemberId(lawyerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        LawyerSchedule schedule = lawyer.getSchedules().stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        LocalTime startTime = getStartTimeForDay(schedule, availableTimesRequestDto.getDayOfWeek());
        LocalTime endTime = getEndTimeForDay(schedule, availableTimesRequestDto.getDayOfWeek());

        if (startTime == null || endTime == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        List<LocalTime> bookedTimes = consultationRepository.findBookedTimesByLawyerAndDate(
                lawyer.getLawyerProfileId(),
                availableTimesRequestDto.getConsultationDate(),
                ConsultationStatus.SCHEDULED
        );

        List<String> availableTimes = generateAvailableTimes(startTime, endTime, bookedTimes);

        return AvailableTimesResponseDto.builder()
                .lawyerId(lawyer.getLawyerProfileId())
                .AvailableTimes(Arrays.asList(
                        AvailableTimesResponseDto.AvailableTimesDto.builder()
                                .date(availableTimesRequestDto.getConsultationDate().toString())
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

        // 기본 요청 생성
//        Request request = Request.builder()
//                .member(client)
//                .status(Request.Status.PENDING)
//                .build();

        // 상담 생성
        Consultation consultation = Consultation.builder()
//                .request(request)
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
}
