package com.dorolaw.request.dto.response;

import com.dorolaw.request.dto.AiReportDto;
import com.dorolaw.request.dto.AnswerDto;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.entity.RequestStatus;
import com.dorolaw.request.entity.RequestTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetailDto {
    private Long requestId;
    private Long memberId;
    private String title;
    private String fileName;
    private String insuranceFaultRatio;
    private String description;
    private String question;
    private Boolean isPublic;
    private RequestStatus status;
    private RequestTag tag;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private AiReportDto aiReport;
    private List<AnswerDto> answers;

    public static RequestDetailDto fromEntity(Request request) {
        RequestDetailDto dto = new RequestDetailDto();
        dto.setRequestId(request.getRequestId());
        dto.setMemberId(request.getMember().getMemberId());
        dto.setTitle(request.getTitle());
        dto.setFileName(request.getFileName());
        dto.setInsuranceFaultRatio(request.getInsuranceFaultRatio());
        dto.setDescription(request.getDescription());
        dto.setQuestion(request.getQuestion());
        dto.setIsPublic(request.getIsPublic());
        dto.setStatus(request.getStatus());
        dto.setTag(request.getTag());
        dto.setCreatedAt(request.getCreatedAt());
        dto.setUpdatedAt(request.getUpdatedAt());

        if (request.getAiReport() != null) {
            dto.setAiReport(AiReportDto.fromEntity(request.getAiReport()));
        }
        if (request.getAnswers() != null) {
            dto.setAnswers(request.getAnswers().stream()
                    .map(AnswerDto::fromEntity)
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}
