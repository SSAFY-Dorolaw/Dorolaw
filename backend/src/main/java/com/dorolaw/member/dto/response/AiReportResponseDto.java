package com.dorolaw.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class AiReportResponseDto {
    private Long reportId;
    private String thumbnailImageUrl;
    private Integer accidentalNegligenceRateA;
    private Integer accidentalNegligenceRateB;
    private Integer accidentPlaceType;
    private Boolean isPublic;
    private LocalDateTime createdAt;
}
