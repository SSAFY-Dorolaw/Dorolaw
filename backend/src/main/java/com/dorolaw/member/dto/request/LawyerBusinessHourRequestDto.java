package com.dorolaw.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LawyerBusinessHourRequestDto {
    private String monday_start_time;
    private String monday_end_time;
    private String tuesday_start_time;
    private String tuesday_end_time;
    private String wednesday_start_time;
    private String wednesday_end_time;
    private String thursday_start_time;
    private String thursday_end_time;
    private String friday_start_time;
    private String friday_end_time;
    private String saturday_start_time;
    private String saturday_end_time;
    private String sunday_start_time;
    private String sunday_end_time;
}
