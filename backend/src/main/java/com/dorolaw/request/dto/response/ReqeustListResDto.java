package com.dorolaw.request.dto.response;

import com.dorolaw.request.entity.Request;
import com.dorolaw.request.entity.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqeustListResDto {
    private Long requestId;
    private String title;
    private RequestStatus status;
    private Long memberId;
    private LocalDateTime createdAt;

    public static ReqeustListResDto fromEntity(Request request) {
        return new ReqeustListResDto(
                request.getRequestId(),
                request.getTitle(),
                request.getStatus(),
                request.getMember().getMemberId(),
                request.getCreatedAt()
        );
    }
}
