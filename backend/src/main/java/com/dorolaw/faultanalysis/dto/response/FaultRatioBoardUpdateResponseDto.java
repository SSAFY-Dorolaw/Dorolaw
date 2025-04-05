package com.dorolaw.faultanalysis.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class FaultRatioBoardUpdateResponseDto {
    private String title;
    private LocalDateTime updatedAt;
}
