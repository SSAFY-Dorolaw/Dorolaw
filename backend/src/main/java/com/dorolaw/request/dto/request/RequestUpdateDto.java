package com.dorolaw.request.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUpdateDto {
    private String title;
    private String insuranceFaultRatio;
    private String description;
    private String question;
    private Boolean isPublic;
}
