package com.dorolaw.faultratioai.service;

import com.dorolaw.faultratioai.dto.AiRequestDto;
import com.dorolaw.request.dto.RequestCreateResDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class DiagnosisRequestService {

    private final RabbitTemplate rabbitTemplate;

    public DiagnosisRequestService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public RequestCreateResDto sendDiagnosisRequest(AiRequestDto requestData) {
        // "diagnosis_queue"라는 큐에 메시지를 발행
        rabbitTemplate.convertAndSend("diagnosis_queue", requestData);

        return new RequestCreateResDto(requestData.getRequestId());
    }
}
