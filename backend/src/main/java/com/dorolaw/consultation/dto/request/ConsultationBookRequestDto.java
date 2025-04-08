package com.dorolaw.consultation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultationBookRequestDto {
    private Long lawyerId;
    private Long requestId;
    private String scheduledDate;
    private String scheduledTime;
    private String consultationType;
    private Integer price;
    private String additionalQuestion;
}

