package com.dorolaw.faultratioai.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaultRatioRequestDto {
    private Long faultAnalysisId;
    private String fileName;
    private String title;
    private boolean isPublic = false;
}
