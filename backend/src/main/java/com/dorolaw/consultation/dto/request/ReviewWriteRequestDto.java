package com.dorolaw.consultation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewWriteRequestDto {
    private Long consultationId;
    private Long lawyerId;
    private Float rating;
    private String comment;
}
