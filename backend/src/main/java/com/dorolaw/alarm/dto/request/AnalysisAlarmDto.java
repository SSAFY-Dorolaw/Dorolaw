package com.dorolaw.alarm.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AnalysisAlarmDto {
    private String content;
    private Long faultAnalysisId;
    private Long memberId;
    private String accidentObject;
    private String accidentLocation;
    private String accidentLocationCharacteristics;
    private String directionOfA;
    private String directionOfB;
    private Integer faultRatioA;
    private Integer faultRatioB;
    private Integer accidentType;
}