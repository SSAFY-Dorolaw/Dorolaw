package com.dorolaw.request.dto;

import com.dorolaw.request.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDto {
    private Long answerId;
    private Long lawyerId;
    private String content;
    private LocalDateTime createdAt;

    public static AnswerDto fromEntity(Answer answer) {
        AnswerDto dto = new AnswerDto();
        dto.setAnswerId(answer.getAnswerId());
        dto.setLawyerId(answer.getLawyer().getMemberId());
        dto.setContent(answer.getContent());
        dto.setCreatedAt(answer.getCreatedAt());
        return dto;
    }
}

