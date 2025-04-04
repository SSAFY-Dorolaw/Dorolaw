package com.dorolaw.faultratioai.controller;

import com.dorolaw.faultratioai.dto.request.FaultRatioBoardRequestDto;
import com.dorolaw.faultratioai.dto.request.FaultRatioRequestDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioResponseDto;
import com.dorolaw.faultratioai.service.FaultAnalysisService;
import com.dorolaw.faultratioai.service.FaultRatioAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//
//    /**
//     * AI 분석 게시판 목록 조회
//     * 공개여부가 public인 의뢰만 최신순으로 모두 가져온다
//     */
//    @GetMapping("/list")
//    public ResponseEntity<Page<FaultRatioBoardResponseDto>> getFaultAnalysisList(
//            @PageableDefault(size = 10) Pageable pageable) {
//        Page<FaultRatioBoardResponseDto> response = faultAnalysisService.getPublicFaultAnalysisList(pageable);
//        return ResponseEntity.ok(response);
//    }
//
//    /**
//     * AI 분석 게시판 상세 조회
//     */
//    @GetMapping("/{requestId}")
//    public ResponseEntity<FaultAnalysisDetailResponseDto> getFaultAnalysisDetail(
//            @PathVariable Long requestId) {
//        FaultAnalysisDetailResponseDto response = faultAnalysisService.getFaultAnalysisDetail(requestId);
//        return ResponseEntity.ok(response);
//    }
//
//    /**
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
