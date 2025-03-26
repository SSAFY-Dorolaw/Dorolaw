package com.dorolaw.request.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCreateDto {
    private String title;
    private String fileName;
    private String insuranceFaultRatio;
    private String description;
    private String question;
    private Boolean isPublic;
}
