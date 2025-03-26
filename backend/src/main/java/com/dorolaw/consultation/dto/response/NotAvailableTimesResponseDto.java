package com.dorolaw.consultation.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Builder
public class NotAvailableTimesResponseDto {
    private Long lawyerId;
    private List<NotAvailableTimesDto> nonAvailableTimes;

    @Getter
    @Builder
    public static class NotAvailableTimesDto {
        private String date;
        private List<String> notTimes;
    }
}
