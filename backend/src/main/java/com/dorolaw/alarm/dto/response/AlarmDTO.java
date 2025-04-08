package com.dorolaw.alarm.dto.response;

import com.dorolaw.alarm.entity.Alarm;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AlarmDTO {
    private Long alarmId;
    private Long receiveMemberId;
    private String content;
    private Boolean isRead;
    private LocalDateTime createdAt;

    public static AlarmDTO fromEntity(Alarm alarm) {
        AlarmDTO dto = new AlarmDTO();
        dto.setAlarmId(alarm.getAlarmId());
        dto.setReceiveMemberId(alarm.getReceiveMemberId());
        dto.setContent(alarm.getContent());
        dto.setIsRead(alarm.getIsRead());
        dto.setCreatedAt(alarm.getCreatedAt());
        return dto;
    }
}
