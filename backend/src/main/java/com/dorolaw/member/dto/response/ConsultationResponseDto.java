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
    private String status;
    private List<ConsultationDetail> consultations;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ConsultationDetail {
        private Long consultationId;
        private String scheduledDate;
        private String consultationMethod;
        private Long clientId;
        private String clientName;
        private Long lawyerId;
        private String lawyerName;
        // 일단 아래는 용국 request 코드 작성전까지 null 처리될것임.
        private Long caseId;
        private String caseTitle;
        private String caseLink;
    }
}
