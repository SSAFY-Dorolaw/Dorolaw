package com.dorolaw.faultratioai.dto.response;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String accidentObject;
    private String accidentLocation;
    private String accidentLocationCharacteristics;
    private String directionOfA;
    private String directionOfB;
    private Integer faultRatioA;
    private Integer faultRatioB;
    private Integer accidentType;

    public static AiReportDto fromEntity(AiReport aiReport) {
        return new AiReportDto(
                aiReport.getReportId(),
                aiReport.getRequest().getRequestId(), // 만약 양방향 관계라면
                aiReport.getCreatedAt(),
                aiReport.getUpdatedAt(),
                aiReport.getAccidentObject(),
                aiReport.getAccidentLocation(),
                aiReport.getAccidentLocationCharacteristics(),
                aiReport.getDirectionOfA(),
                aiReport.getDirectionOfB(),
                aiReport.getFaultRatioA(),
                aiReport.getFaultRatioB(),
                aiReport.getAccidentType()
        );
    }
}
