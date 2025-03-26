package com.dorolaw.request.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerCreateDto {
    private String content;
    private Long requestId;
}

