package com.dorolaw.member.controller;

import com.dorolaw.member.dto.response.AiReportResponseDto;
import com.dorolaw.member.dto.response.ClientRequestResponseDto;
import com.dorolaw.member.dto.response.ConsultationResponseDto;
import com.dorolaw.member.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private final MypageService mypageService;

    // 사용자가 예약한 모든 상담 내역 조회 API
    @GetMapping("/consultations")
    public ResponseEntity<ConsultationResponseDto> getConsultations(
            @RequestHeader("Authorization") String authorizationHeader) {
        ConsultationResponseDto responseDto = mypageService.getAllConsultations(authorizationHeader);
        return ResponseEntity.ok(responseDto);
    }

    // 일반 사용자 모든 의뢰 내역 조회 API
    @GetMapping("/requests")
    public ResponseEntity<ClientRequestResponseDto> getClientRequests(
            @RequestHeader("Authorization") String authorizationHeader) {
        ClientRequestResponseDto response = mypageService.getClientRequests(authorizationHeader);
        return ResponseEntity.ok(response);

    }

//     본인이 업로드한 AI 분석자료 조회
    @GetMapping("/clients/reports")
    public ResponseEntity<List<AiReportResponseDto>> getMyReports(
            @RequestHeader("Authorization") String authorizationHeader) {
        List<AiReportResponseDto> reports = mypageService.getAllReportsForMember(authorizationHeader);
        return ResponseEntity.ok(reports);
    }


}
