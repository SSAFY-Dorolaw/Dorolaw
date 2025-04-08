package com.dorolaw.faultanalysis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AiFaultDto {
    private Long faultAnalysisId;
    private Long memberId;
    private String fileName;
}
