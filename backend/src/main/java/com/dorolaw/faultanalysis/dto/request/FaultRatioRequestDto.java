package com.dorolaw.faultanalysis.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaultRatioRequestDto {
    private String fileName;
    private String title;
    private boolean isPublic = false;
}
