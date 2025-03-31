package com.dorolaw.consultation.dto.response;

import lombok.*;
import java.util.List;

@Getter
@Builder
public class AvailableTimesResponseDto {
    private Long lawyerId;
    private List<AvailableTimesDto> AvailableTimes;

    @Getter
    @Builder
    public static class AvailableTimesDto {
        private String date;
        private List<String> Times;
    }
}
