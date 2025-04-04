package com.dorolaw.faultratioai.controller;

import com.dorolaw.faultratioai.dto.request.FaultRatioBoardRequestDto;
import com.dorolaw.faultratioai.dto.request.FaultRatioBoardUpdateRequestDto;
import com.dorolaw.faultratioai.dto.request.FaultRatioRequestDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioBoardResponseDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioBoardUpdateResponseDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioResponseDto;
import com.dorolaw.faultratioai.service.FaultAnalysisService;
import com.dorolaw.faultratioai.service.FaultRatioAiService;
import com.google.api.gax.paging.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class FaultratioaiController {

    private final FaultRatioAiService faultRatioAiService;
    private final FaultAnalysisService faultAnalysisService;

    // 과실 비율 분석 요청 등록 API
    @PostMapping("/analysis")
    public ResponseEntity<FaultRatioResponseDto> faultRatioAnalysis(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody FaultRatioRequestDto faultRatioRequestDto) {
        FaultRatioResponseDto response = faultRatioAiService.sendratioDiagnosisRequest(authorizationHeader, faultRatioRequestDto);
        return ResponseEntity.ok(response);
    }

    // AI 분석 게시판 등록
    @PostMapping("/")
    public ResponseEntity<?> faultRatioBoardPost(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody FaultRatioBoardRequestDto faultRatioBoardRequestDto) {
        faultAnalysisService.createFaultAnalysis(authorizationHeader, faultRatioBoardRequestDto);
        return ResponseEntity.ok().build();
    }

    // AI 분석 게시판 상세 조회
    @GetMapping("/{faultAnalysisId}")
    public ResponseEntity<FaultRatioBoardResponseDto> getFaultAnalysisList(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long faultAnalysisId
            ) {
        FaultRatioBoardResponseDto response = faultAnalysisService.getFaultAnalysisDetail(authorizationHeader, faultAnalysisId);
        return ResponseEntity.ok(response);
    }

    // Controller
    @PatchMapping("/{id}")
    public ResponseEntity<FaultRatioBoardUpdateResponseDto> updateFaultRatioBoard(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody FaultRatioBoardUpdateRequestDto updateRequestDto) {
        FaultRatioBoardUpdateResponseDto responseDto = faultAnalysisService.updateFaultAnalysis(authorizationHeader, updateRequestDto);
        return ResponseEntity.ok(responseDto);
    }

//     * AI 분석 게시판 상세 수정
//     */
//    @PutMapping("/{requestId}")
//    public ResponseEntity<FaultAnalysisUpdateResponseDto> updateFaultAnalysis(
//            @RequestHeader("Authorization") String authorizationHeader,
//            @PathVariable Long requestId,
//            @RequestBody FaultAnalysisUpdateRequestDto updateRequestDto) {
//        FaultAnalysisUpdateResponseDto response = faultAnalysisService.updateFaultAnalysis(
//                authorizationHeader, requestId, updateRequestDto);
//        return ResponseEntity.ok(response);
//    }
//
//    /**
//     * AI 분석 게시판 상세 삭제
//     */
//    @DeleteMapping("/{requestId}")
//    public ResponseEntity<Void> deleteFaultAnalysis(
//            @RequestHeader("Authorization") String authorizationHeader,
//            @PathVariable Long requestId) {
//        faultAnalysisService.deleteFaultAnalysis(authorizationHeader, requestId);
//        return ResponseEntity.noContent().build();
//    }
}
