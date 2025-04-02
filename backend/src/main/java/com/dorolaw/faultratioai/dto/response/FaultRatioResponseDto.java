package com.dorolaw.faultratioai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FaultRatioResponseDto {
    private Long faultAnalysisId;
    private String title;
    private String fileName;
    private Boolean isPublic;
}
