package com.dorolaw.faultratioai.dto;

import com.dorolaw.faultratioai.entity.AiReport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiReportDto {
    private Long reportId;
    private Long requestId;
    private String fileName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer accidentalNegligenceRateA;
    private Integer accidentalNegligenceRateB;
    private Integer accidentPlace;
    private Integer accidentPlaceFeature;
    private Integer vehicleAProgressInfo;
    private Integer vehicleBProgressInfo;

    public static AiReportDto fromEntity(AiReport aiReport) {
        return new AiReportDto(
                aiReport.getReportId(),
                aiReport.getRequest().getRequestId(), // 만약 양방향 관계라면
                aiReport.getFileName(),
                aiReport.getCreatedAt(),
                aiReport.getUpdatedAt(),
                aiReport.getAccidentalNegligenceRateA(),
                aiReport.getAccidentalNegligenceRateB(),
                aiReport.getAccidentPlace(),
                aiReport.getAccidentPlaceFeature(),
                aiReport.getVehicleAProgressInfo(),
                aiReport.getVehicleBProgressInfo()
        );
    }
}
