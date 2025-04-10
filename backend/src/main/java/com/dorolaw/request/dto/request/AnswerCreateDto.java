package com.dorolaw.request.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerCreateDto {
    private String content;
    private Long requestId;
    private String title;
    private Long memberId;
}

