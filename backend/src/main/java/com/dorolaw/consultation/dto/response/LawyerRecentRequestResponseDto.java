package com.dorolaw.consultation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LawyerRecentRequestResponseDto {
    private Long requestId;
    private String title;
    private Long memberId;
    private String requestAnsweredContent;
    private LocalDateTime answeredAt;
    private Boolean isSelected;
    private String requestStatus;

}