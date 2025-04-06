package com.dorolaw.consultation.controller;

import com.dorolaw.consultation.dto.request.ConsultationBookRequestDto;
import com.dorolaw.consultation.dto.request.AvailableTimesRequestDto;
import com.dorolaw.consultation.dto.request.ReviewWriteRequestDto;
import com.dorolaw.consultation.dto.response.AvailableTimesResponseDto;
import com.dorolaw.consultation.dto.response.ConsultationBookResponseDto;
import com.dorolaw.consultation.dto.response.ReviewResponseDto;
import com.dorolaw.consultation.dto.response.ReviewWriteResponseDto;
import com.dorolaw.consultation.service.ConsultationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/counseling")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    // 예약 가능한 특정일 시간 조회 API
    @GetMapping("/{lawyerId}/available-times")
    public ResponseEntity<AvailableTimesResponseDto> getAvailableTimes(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long lawyerId,
            @RequestBody AvailableTimesRequestDto notAvailableTimesRequestDto){
        AvailableTimesResponseDto response = consultationService.getAvailableTimes(lawyerId,notAvailableTimesRequestDto);
        return ResponseEntity.ok(response);
    }

    // 상담 예약 신청 API
    @PostMapping("/book")
    public ResponseEntity<ConsultationBookResponseDto> bookConsultation(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ConsultationBookRequestDto requestDto) {
        ConsultationBookResponseDto response = consultationService.bookConsultation(authorizationHeader, requestDto);
        return ResponseEntity.ok(response);
    }

    // 상담 후기 작성 API
    @PostMapping("/reviews")
    public ResponseEntity<ReviewWriteResponseDto> writeReview(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ReviewWriteRequestDto requestDto) {
        ReviewWriteResponseDto response = consultationService.writeReview(requestDto);
        return ResponseEntity.ok(response);
    }

    // 상담 후기 조회 API
    @GetMapping("/reviews/{consultationId}")
    public ResponseEntity<ReviewResponseDto> getReviews(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long consultationId){
        ReviewResponseDto response = consultationService.getReviews(consultationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/lawyer-profile/{lawyerId}")
    public ResponseEntity<Object> getLawyerProfile(@PathVariable Long lawyerId) {
        Object responseDto = consultationService.getMemberInfo(lawyerId);
        return ResponseEntity.ok(responseDto);
    }
}
