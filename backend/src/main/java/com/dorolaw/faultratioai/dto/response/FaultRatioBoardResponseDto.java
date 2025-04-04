package com.dorolaw.faultratioai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaultRatioBoardResponseDto {
    private Long faultAnalysisId;
    private Long memberId;
    private String title;
    private String fileName;
    private Boolean isPublic;
    private FaultAiReportDataDto aiReport;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class FaultAiReportDataDto {
        private Long reportId;
        private Long faultAnalysisId;
        private LocalDateTime createAt;
        private LocalDateTime updatedAt;
        private String accidentObject;
        private String accidentLocation;
        private String accidentLocationCharacteristics;
        private String directionOfA;
        private String directionOfB;
        private Integer faultRatioA;
        private Integer faultRatioB;
        private Integer accidentType;
    }
}
