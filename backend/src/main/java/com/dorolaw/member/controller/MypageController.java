package com.dorolaw.member.controller;

import com.dorolaw.member.dto.response.*;
import com.dorolaw.member.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MypageController {

    private final MypageService mypageService;

    // 일반 사용자(본인)가 예약한 모든 상담 내역 조회
    @GetMapping("/consultations")
    public ResponseEntity<ConsultationResponseDto> getConsultations(
            @RequestHeader("Authorization") String authorizationHeader) {
        ConsultationResponseDto responseDto = mypageService.getAllConsultations(authorizationHeader);
        return ResponseEntity.ok(responseDto);
    }

    // 일반 사용자 본인이 작성한 모든 의뢰 내역 조회 API
    @GetMapping("/requests")
    public ResponseEntity<ClientRequestResponseDto> getClientRequests(
            @RequestHeader("Authorization") String authorizationHeader) {
        ClientRequestResponseDto response = mypageService.getClientRequests(authorizationHeader);
        return ResponseEntity.ok(response);
    }

    // 사용자가 업로드한 과실비율 분석 영상 자료 조회 API
    // 최신순 정렬
    @GetMapping("/clients/reports")
    public ResponseEntity<List<AiReportResponseDto>> getMyReports(
            @RequestHeader("Authorization") String authorizationHeader) {
        List<AiReportResponseDto> reports = mypageService.getAllReportsForMember(authorizationHeader);
        return ResponseEntity.ok(reports);
    }

    // 변호사-상담 신청 들어온 내역 조회 API
    @GetMapping("/lawyer/consultation")
    public ResponseEntity<List<LawyerConsultationResponse>> getLawyerConsultations(
            @RequestHeader("Authorization") String authorizationHeader) {
        List<LawyerConsultationResponse> response = mypageService.getLawyerConsultations(authorizationHeader);
        return ResponseEntity.ok(response);
    }

    // 변호사 - 의뢰답변 작성한 의뢰 리스트
    @GetMapping("/lawyer/requests")
    public ResponseEntity<List<LawyerAnsweredInquiryListResponseDto>> getAnsweredRequest(
        @RequestHeader("Authorization") String authorizationHeader) {
        List<LawyerAnsweredInquiryListResponseDto> response = mypageService.getAnsweredRequestList(authorizationHeader);
        return ResponseEntity.ok(response);
    }
}

