package com.dorolaw.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class AiReportResponseDto {
    private Long reportId;
    private String fileName;
    private Integer faultRatioA;
    private Integer faultRatioB;
    private LocalDateTime reportCreatedAt;
    private Boolean isPublic;
}
