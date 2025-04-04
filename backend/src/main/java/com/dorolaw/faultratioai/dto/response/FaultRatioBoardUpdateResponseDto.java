package com.dorolaw.faultratioai.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class FaultRatioBoardUpdateResponseDto {
    private String title;
    private LocalDateTime updatedAt;

    @Builder
    public FaultRatioBoardUpdateResponseDto(String title, LocalDateTime updatedAt) {
        this.title = title;
        this.updatedAt = updatedAt;
    }
}
