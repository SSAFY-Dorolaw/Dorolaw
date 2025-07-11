package com.dorolaw.consultation.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class AvailableTimesRequestDto {
    private LocalDate consultationDate;
    private String dayOfWeek; // 'MON', 'TUE' 등
}
