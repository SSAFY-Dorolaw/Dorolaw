package com.dorolaw.faultratioai.controller;

import com.dorolaw.faultratioai.dto.request.FaultRatioRequestDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioResponseDto;
import com.dorolaw.faultratioai.service.FaultRatioAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class FaultratioaiController {

    private final FaultRatioAiService faultRatioAiService;

    @PostMapping("/analysis")
    public ResponseEntity<FaultRatioResponseDto> create(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody FaultRatioRequestDto faultRatioRequestDto) {

        FaultRatioResponseDto response = faultRatioAiService.sendratioDiagnosisRequest(authorizationHeader, faultRatioRequestDto);
        return ResponseEntity.ok(response);
    }
}
