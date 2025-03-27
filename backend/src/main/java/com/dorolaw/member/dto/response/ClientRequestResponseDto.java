package com.dorolaw.member.dto.response;


import com.dorolaw.faultratioai.entity.AiReport;
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
    private List<ClientRequestDetail> requests;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ClientRequestDetail {
        private Long requestId;
        private String title;
        private String createdAt;
        private String status;
        private String videoUrl;
        private AiReport reportUrl;
        private String faultRatio;
    }
}
