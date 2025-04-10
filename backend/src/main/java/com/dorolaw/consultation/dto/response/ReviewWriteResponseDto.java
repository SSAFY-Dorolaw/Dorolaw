package com.dorolaw.consultation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewWriteResponseDto {
    private Long reviewId;
    private String createdAt;
}
