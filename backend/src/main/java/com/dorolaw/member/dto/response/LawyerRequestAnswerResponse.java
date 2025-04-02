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
public class LawyerRequestAnswerResponse {
    private List<AnswerDetail> answers;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnswerDetail {
        private Long answerId;
        private Long caseId;
        private String caseTitle;
        private String content;
        private Long clientId;
        private String clientName;
        private String createdAt;
        private Long consultationId;
    }
}
