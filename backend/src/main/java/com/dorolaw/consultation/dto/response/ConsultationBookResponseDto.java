package com.dorolaw.consultation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultationBookResponseDto {
    private Long consultationId;
    private Long requestId;
    private String status;
    private String scheduledDate;
    private LawyerInfo lawyer;
    private ClientInfo client;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LawyerInfo {
        private Long lawyerId;
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClientInfo {
        private Long clientId;
        private String name;
    }
}