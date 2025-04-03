package com.dorolaw.alarm.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestAlarmDto {
    private String content;
    private Long requestId;
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
