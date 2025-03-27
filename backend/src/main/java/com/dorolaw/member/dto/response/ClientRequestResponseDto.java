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
public class ClientRequestResponseDto {
    private List<ClientRequestDetail> cases;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClientRequestDetail {
        private Long caseId;
        private String title;
        private String createdAt;
        private String status;
        private String videoUrl;
        private String reportUrl;
        private String faultRatio;
        private Long consultationId;
    }
}
