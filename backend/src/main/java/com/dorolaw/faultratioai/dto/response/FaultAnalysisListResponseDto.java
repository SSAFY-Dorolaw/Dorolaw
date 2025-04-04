package com.dorolaw.faultratioai.dto.response;

import com.dorolaw.faultratioai.entity.FaultAnalysis;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaultAnalysisListResponseDto {
    private Long faultAnalysisId; // 과실비율분석Id
    private String title;
    private String status;
    private Long memberId;
    private LocalDateTime createdAt;

    public static FaultAnalysisListResponseDto fromEntity(FaultAnalysis faultAnalysis) {
        return FaultAnalysisListResponseDto.builder()
                .faultAnalysisId(faultAnalysis.getFaultAnalysisId())
                .title(faultAnalysis.getTitle())
                .status(faultAnalysis.getStatus().name())
                .memberId(faultAnalysis.getMemberId())
                .createdAt(faultAnalysis.getCreatedAt())
                .build();
    }
}