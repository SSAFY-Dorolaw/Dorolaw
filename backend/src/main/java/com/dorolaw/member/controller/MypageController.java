package com.dorolaw.member.controller;

import com.dorolaw.member.dto.response.ClientRequestResponseDto;
import com.dorolaw.member.dto.response.ConsultationResponseDto;
import com.dorolaw.member.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private final MypageService mypageService;

    // 사용자가 예약한 모든 상담 내역 조회 API
    @GetMapping("/mypage/consultations")
    public ResponseEntity<ConsultationResponseDto> getConsultations(
            @RequestHeader("Authorization") String authorizationHeader) {
        ConsultationResponseDto responseDto = mypageService.getAllConsultations(authorizationHeader);
        return ResponseEntity.ok(responseDto);
    }

    // 일반 사용자 모든 의뢰 내역 조회 API
    @GetMapping("/mypage/requests")
    public ResponseEntity<ClientRequestResponseDto> getClientRequests(
            @RequestHeader("Authorization") String authorizationHeader) {
        ClientRequestResponseDto response = mypageService.getClientRequests(authorizationHeader);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/mypage/answers")
    public ResponseEntity<LawyerRequestAnswerResponse> getLawyerAnswers(
            @RequestHeader("Authorization") String authorizationHeader) {
        LawyerRequestAnswerResponse response = mypageService.getLawyerRequestAnswers(authorizationHeader);
        return ResponseEntity.ok(response));
    }

//    @GetMapping("/mypage/members/generalReviews")
//    public ResponseEntity<ConsultationDtos.GeneralReviewResponse> getGeneralMemberReviews(
//            @CurrentUser Member client
//    ) {
//        return ResponseEntity.ok(consultationService.getGeneralMemberReviews(client));
//    }
//
//    @GetMapping("/mypage/members/lawyerReviews")
//    public ResponseEntity<ConsultationDtos.LawyerReviewResponse> getLawyerReviews(
//            @CurrentUser Member lawyer
//    ) {
//        return ResponseEntity.ok(consultationService.getLawyerReviews(lawyer));
//    }
//
//    @GetMapping("/mypage/clients/reports")
//    public ResponseEntity<ConsultationDtos.ReportResponse> getReports(
//            @CurrentUser Member member,
//            @RequestParam Long caseId
//    ) {
//        return ResponseEntity.ok(consultationService.getReports(member, caseId));
//    }

}
