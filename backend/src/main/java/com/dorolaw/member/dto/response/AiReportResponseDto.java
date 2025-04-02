package com.dorolaw.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class AiReportResponseDto {
    private Long reportId;
    private String thumbnailImageUrl;
    private String accidentObject;
    private String accidentLocation;
    private String accidentLocationCharacteristics;
    private String directionOfA;
    private String directionOfB;
    private Integer faultRatioA;
    private Integer faultRatioB;
    private Integer accidentType;
    private Boolean isPublic;
    private LocalDateTime createdAt;
}
