package com.dorolaw.request.controller;

import com.dorolaw.request.dto.*;
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

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    // 의뢰 등록 API
    @PostMapping
    public ResponseEntity<RequestCreateResDto> create(@RequestHeader("Authorization") String authorizationHeader,
                                       @RequestBody RequestCreateDto dto) {
        RequestCreateResDto res = requestService.createRequest(authorizationHeader, dto);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody RequestUpdateDto dto) {
        requestService.updateRequest(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestDetailDto> getRequestDetail(@PathVariable Long id) {
        RequestDetailDto dto = requestService.getRequestDetail(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<ReqeustListResDto>> getRequestList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReqeustListResDto> requestList = requestService.getRequestList(page, size);
        return ResponseEntity.ok(requestList);
    }
}
