package com.dorolaw.alarm.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestAlarmDto {
    private String content;
    private Long requestId;
    private Long memberId;
    private String AccidentObject;
    private String AccidentLocation;
    private String AccidentLocationCharacteristics;
    private String DirectionOfA;
    private String DirectionOfB;
    private Integer FaultRatioA;
    private Integer FaultRatioB;
    private Integer AccidentType;
}
