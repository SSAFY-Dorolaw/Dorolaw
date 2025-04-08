package com.dorolaw.request.controller;

import com.dorolaw.request.dto.request.AnswerCreateDto;
import com.dorolaw.request.dto.request.AnswerUpdateDto;
import com.dorolaw.request.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping
    public ResponseEntity<Long> createAnswer(@RequestHeader("Authorization") String authorizationHeader,
                                       @RequestBody AnswerCreateDto dto) {
        answerService.createAnswer(authorizationHeader, dto);
        return ResponseEntity.ok(dto.getRequestId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateAnswer(@PathVariable Long id, @RequestBody AnswerUpdateDto dto) {
        answerService.updateAnswer(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }
}
