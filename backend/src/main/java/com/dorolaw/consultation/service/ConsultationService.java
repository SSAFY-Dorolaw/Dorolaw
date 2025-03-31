package com.dorolaw.consultation.service;

import com.dorolaw.consultation.dto.request.ConsultationBookRequestDto;
import com.dorolaw.consultation.dto.request.NotAvailableTimesRequestDto;
import com.dorolaw.consultation.dto.request.ReviewWriteRequestDto;
import com.dorolaw.consultation.dto.response.ConsultationBookResponseDto;
import com.dorolaw.consultation.dto.response.NotAvailableTimesResponseDto;
import com.dorolaw.consultation.dto.response.ReviewWriteResponseDto;
import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.entity.ConsultationStatus;
import com.dorolaw.consultation.entity.ConsultationType;
import com.dorolaw.consultation.entity.Review;
import com.dorolaw.consultation.repository.ConsultationRepository;
import com.dorolaw.consultation.repository.ReviewRepository;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final LawyerProfileRepository lawyerProfileRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ConsultationRepository consultationRepository;
    private final ReviewRepository reviewRepository;

    public NotAvailableTimesResponseDto getNotAvailableTimes(
            String authorizationHeader,
            Long lawyerId,
            NotAvailableTimesRequestDto availableTimesRequestDto){

        LawyerProfile lawyer = lawyerProfileRepository.findByMember_MemberId(lawyerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        List<LocalTime> bookedTimes = consultationRepository.findBookedTimesByLawyerAndDate(
                lawyer.getLawyerProfileId(),
                availableTimesRequestDto.getConsultationDate(),
                ConsultationStatus.CONFIRMED
        );

        List<String> notAvailableTimes = bookedTimes.stream()
                .map(time -> time.format(DateTimeFormatter.ofPattern("HH:mm")))
                .collect(Collectors.toList());

        return NotAvailableTimesResponseDto.builder()
                .lawyerId(lawyer.getLawyerProfileId())
                .nonAvailableTimes(Arrays.asList(
                        NotAvailableTimesResponseDto.NotAvailableTimesDto.builder()
                                .date(availableTimesRequestDto.getConsultationDate().toString())
                                .notTimes(notAvailableTimes)
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
                .status(ConsultationStatus.CONFIRMED)
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
}
