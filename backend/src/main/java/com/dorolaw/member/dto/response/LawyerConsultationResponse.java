package com.dorolaw.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
public class LawyerConsultationResponse {
    private Long consultationId;
    private String clientName;
    private Long requestId;
    private String requestTitle;
    private String requestContent;
    private String additionalQuestion;
    private String consultationStatus;
    private LocalDate consultationDate;
    private LocalTime consultationTime;
    private String consultationType;
}