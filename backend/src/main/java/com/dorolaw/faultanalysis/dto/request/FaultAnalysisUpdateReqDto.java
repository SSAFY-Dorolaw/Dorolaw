package com.dorolaw.faultanalysis.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaultAnalysisUpdateReqDto {
    private String title;
    private Boolean isPublic;
}
