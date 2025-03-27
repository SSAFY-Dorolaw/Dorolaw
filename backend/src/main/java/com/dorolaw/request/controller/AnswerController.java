package com.dorolaw.request.controller;

import com.dorolaw.request.dto.AnswerCreateDto;
import com.dorolaw.request.dto.AnswerUpdateDto;
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
    public ResponseEntity<Void> create(@RequestHeader("Authorization") String authorizationHeader,
                                       @RequestBody AnswerCreateDto dto) {
        answerService.createAnswer(authorizationHeader, dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody AnswerUpdateDto dto) {
        answerService.updateAnswer(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        answerService.deleteAnswer(id);
        return ResponseEntity.noContent().build();
    }
}
