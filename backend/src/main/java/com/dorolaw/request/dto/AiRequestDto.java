package com.dorolaw.request.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AiRequestDto  {
    private Long requestId;
    private Long memberId;
    private String fileName;
    private String title;
}
