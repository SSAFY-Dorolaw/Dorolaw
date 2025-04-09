package com.dorolaw.consultation.controller;

import com.dorolaw.alarm.service.AlarmService;
import com.dorolaw.consultation.dto.request.ConsultationBookRequestDto;
import com.dorolaw.consultation.dto.request.ReviewWriteRequestDto;
import com.dorolaw.consultation.dto.response.*;
import com.dorolaw.consultation.service.ConsultationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/counseling")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;
    private final AlarmService alarmService;

    // 예약 가능한 특정일 시간 조회 API
    @GetMapping("/{lawyerId}/available-times/{consultationDate}")
    public ResponseEntity<AvailableTimesResponseDto> getAvailableTimes(
            @PathVariable Long lawyerId,
            @PathVariable String consultationDate){
        AvailableTimesResponseDto response = consultationService.getAvailableTimes(lawyerId,consultationDate);
        return ResponseEntity.ok(response);
    }

    // 상담 예약 신청 API
    @PostMapping("/book")
    public ResponseEntity<ConsultationBookResponseDto> bookConsultation(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ConsultationBookRequestDto requestDto) {
        ConsultationBookResponseDto response = consultationService.bookConsultation(authorizationHeader, requestDto);
        alarmService.checkConsultation(response.getLawyer().getLawyerId(),response.getConsultationId(),response.getScheduledDate());
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
            @PathVariable Long consultationId){
        ReviewResponseDto response = consultationService.getReviews(consultationId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/lawyer-profile/{memberId}")
    public ResponseEntity<Object> getLawyerProfile(@PathVariable Long memberId) {
        Object responseDto = consultationService.getMemberInfo(memberId);
        return ResponseEntity.ok(responseDto);
    }

    // 변호사 최근 의뢰내역 최근순서
    @GetMapping("/recent-requests/{memberId}")
    public ResponseEntity<List<LawyerRecentRequestResponseDto>> getRecentRequests(
            @PathVariable Long memberId) {
        List<LawyerRecentRequestResponseDto> recentRequests = consultationService.getRecentRequestsByMemberId(memberId);
        return ResponseEntity.ok(recentRequests);
    }
}
