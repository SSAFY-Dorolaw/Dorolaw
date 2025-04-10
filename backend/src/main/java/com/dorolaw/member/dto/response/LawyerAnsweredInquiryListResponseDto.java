package com.dorolaw.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
public class LawyerAnsweredInquiryListResponseDto {

    private Long requestId;
    private String title;
    private Long memberId;
    private String requestAnsweredContent;
    private LocalDateTime answeredAt;
    private Boolean isSelected;
    private String requestStatus;

    @Builder
    public LawyerAnsweredInquiryListResponseDto(Long requestId, String title, Long memberId,
                                                String requestAnsweredContent, LocalDateTime answeredAt,
                                                Boolean isSelected, String requestStatus) {
        this.requestId = requestId;
        this.title = title;
        this.memberId = memberId;
        this.requestAnsweredContent = requestAnsweredContent;
        this.answeredAt = answeredAt;
        this.isSelected = isSelected;
        this.requestStatus = requestStatus;
    }

}
