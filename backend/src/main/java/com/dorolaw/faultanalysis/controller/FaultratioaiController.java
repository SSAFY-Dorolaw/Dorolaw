package com.dorolaw.faultanalysis.controller;

import com.dorolaw.faultanalysis.dto.AiFaultDto;
import com.dorolaw.faultanalysis.dto.request.FaultAnalysisCreateReqDto;
import com.dorolaw.faultanalysis.dto.request.FaultAnalysisUpdateReqDto;
import com.dorolaw.faultanalysis.dto.request.FaultRatioRequestDto;
import com.dorolaw.faultanalysis.dto.response.FaultAnalysisListResponseDto;
import com.dorolaw.faultanalysis.dto.response.FaultRatioBoardResponseDto;
import com.dorolaw.faultanalysis.dto.response.FaultRatioBoardUpdateResponseDto;
import com.dorolaw.faultanalysis.dto.response.FaultRatioResponseDto;
import com.dorolaw.faultanalysis.service.FaultAnalysisService;
import com.dorolaw.rabbitmq.service.DiagnosisRequestService;
import com.dorolaw.request.dto.AiRequestDto;
import com.dorolaw.request.dto.response.RequestCreateResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fault-analysis")
public class FaultratioaiController {
    private final FaultAnalysisService faultAnalysisService;
    private final DiagnosisRequestService diagnosisRequestService;

    // AI 분석 게시판 글 등록
    @PostMapping
    public ResponseEntity<AiFaultDto> createFaultAnalysisAndDiagnose(@RequestHeader("Authorization") String authorizationHeader,
                                                                        @RequestBody FaultAnalysisCreateReqDto dto) {
        AiFaultDto aiFaultDto = faultAnalysisService.createFaultAnalysis(authorizationHeader, dto); // request db에 등록
        diagnosisRequestService.sendDiagnosisFaultAnalysis(aiFaultDto); // rabbitmq에 진단 요청 보내기
        return ResponseEntity.ok(aiFaultDto);
    }

    // AI 분석 게시판 글 수정
    @PatchMapping("/{faultAnalysisId}")
    public ResponseEntity<FaultRatioBoardUpdateResponseDto> updateFaultAnalysis(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody FaultAnalysisUpdateReqDto updateRequestDto) {
        FaultRatioBoardUpdateResponseDto responseDto = faultAnalysisService.updateFaultAnalysis(authorizationHeader, updateRequestDto);
        return ResponseEntity.ok(responseDto);
    }

    // AI 분석 게시판 글 삭제
    @DeleteMapping("/{faultAnalysisId}")
    public ResponseEntity<Void> deleteFaultAnalysis(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long faultAnalysisId) {
        faultAnalysisService.deleteFaultAnalysis(authorizationHeader, faultAnalysisId);
        return ResponseEntity.ok().build();
    }

    // AI 분석 게시판 상세 조회
    @GetMapping("/{faultAnalysisId}")
    public ResponseEntity<FaultRatioBoardResponseDto> getfaultAnalysisDetail(
            @PathVariable Long faultAnalysisId
    ) {
        FaultRatioBoardResponseDto response = faultAnalysisService.getFaultAnalysisDetail(faultAnalysisId);
        return ResponseEntity.ok(response);
    }

    // AI 분석 게시판 목록 조회
    @GetMapping("/list/{memberId}")
    public ResponseEntity<Page<FaultAnalysisListResponseDto>> getPublicFaultRatioBoardList(
            @PathVariable Long memberId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<FaultAnalysisListResponseDto> result = faultAnalysisService.getPublicFaultAnalysisList(memberId, pageable);
        return ResponseEntity.ok(result);
    }
}
