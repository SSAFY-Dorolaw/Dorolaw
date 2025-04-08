package com.dorolaw.consultation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponseDto {
    private Long reviewId;
    private Long consultationId;
    private Long lawyerId;
    private String lawyerName;
    private String clientName;
    private Float rating;
    private String content;
    private String createdAt;

}
