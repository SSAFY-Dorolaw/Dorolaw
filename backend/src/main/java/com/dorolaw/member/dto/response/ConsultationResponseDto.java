package com.dorolaw.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultationResponseDto {
    private List<ConsultationDetail> consultations;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ConsultationDetail {
        private Long consultationId;
        private String scheduledDate;
        private String consultationMethod;
        private String status;
        private Long clientId;
        private String clientName;
        private Long lawyerId;
        private String lawyerName;
        private Long requestId;
        private String requestTitle;
    }
}
