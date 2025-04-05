package com.dorolaw.rabbitmq.service;

import com.dorolaw.faultanalysis.dto.AiFaultDto;
import com.dorolaw.request.dto.AiRequestDto;
import com.dorolaw.request.dto.response.RequestCreateResDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

// 진단 요청 용도
@Service
public class DiagnosisRequestService {

    private final RabbitTemplate rabbitTemplate;

    public DiagnosisRequestService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public RequestCreateResDto sendDiagnosisRequest(AiRequestDto requestData) {
        // "requests_queue"라는 큐에 메시지를 발행
        rabbitTemplate.convertAndSend("requests_queue", requestData);
        return new RequestCreateResDto(requestData.getRequestId());
    }

    public void sendDiagnosisFaultAnalysis(AiFaultDto requestData) {
        rabbitTemplate.convertAndSend("main_diagnosis_queue", requestData);
    }
}
