package com.dorolaw.request.controller;

import com.dorolaw.request.dto.AiRequestDto;
import com.dorolaw.rabbitmq.service.DiagnosisRequestService;
import com.dorolaw.request.dto.request.RequestCreateDto;
import com.dorolaw.request.dto.request.RequestUpdateDto;
import com.dorolaw.request.dto.response.ReqeustListResDto;
import com.dorolaw.request.dto.response.RequestCreateResDto;
import com.dorolaw.request.dto.response.RequestDetailDto;
import com.dorolaw.request.service.RequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/requests")
@Slf4j
public class RequestController {

    private final RequestService requestService;
    private final DiagnosisRequestService diagnosisRequestService;

    public RequestController(RequestService requestService, DiagnosisRequestService diagnosisRequestService) {
        this.requestService = requestService;
        this.diagnosisRequestService = diagnosisRequestService;
    }

    // 의뢰 등록 API
    @PostMapping
    public ResponseEntity<RequestCreateResDto> createRequestAndDiagnose(@RequestHeader("Authorization") String authorizationHeader,
                                                                        @RequestBody RequestCreateDto dto) {
        AiRequestDto aiRequestDto = requestService.createRequest(authorizationHeader, dto); // request db에 등록
        RequestCreateResDto res = diagnosisRequestService.sendDiagnosisRequest(aiRequestDto); // rabbitmq에 진단 요청 보내기
        return ResponseEntity.ok(res);
    }

    // 의뢰 수정 API
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRequest(@PathVariable Long id, @RequestBody RequestUpdateDto dto) {
        requestService.updateRequest(id, dto);
        return ResponseEntity.ok().build();
    }

    // 의뢰 삭제 API
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.ok().build();
    }

    // 의뢰 상세 조회 API
    @GetMapping("/{id}")
    public ResponseEntity<RequestDetailDto> getRequestDetail(@PathVariable Long id) {
        RequestDetailDto res = requestService.getRequestDetail(id);
        return ResponseEntity.ok(res);
    }

    // 의뢰 목록 조회 API
    @GetMapping("/list")
    public ResponseEntity<Page<ReqeustListResDto>> getRequestList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReqeustListResDto> requestList = requestService.getRequestList(page, size);
        return ResponseEntity.ok(requestList);
    }
}
