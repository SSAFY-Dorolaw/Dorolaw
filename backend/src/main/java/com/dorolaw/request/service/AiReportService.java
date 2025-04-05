package com.dorolaw.request.service;

import com.dorolaw.alarm.dto.request.RequestAlarmDto;
import com.dorolaw.request.entity.AiReport;
import com.dorolaw.request.repository.ReqeustAiReportRepository;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.repository.RequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiReportService {

    private final RequestRepository requestRepository;
    private final ReqeustAiReportRepository requestAiReportRepository;

    @Transactional
    public void saveReqeustReport(RequestAlarmDto requestAlarmDto) {
        Request reqeust = requestRepository.getReferenceById(requestAlarmDto.getRequestId());
        AiReport report = new AiReport();
        report.setRequest(reqeust);
        report.setAccidentObject(requestAlarmDto.getAccidentObject());
        report.setAccidentLocation(requestAlarmDto.getAccidentLocation());
        report.setAccidentLocationCharacteristics(requestAlarmDto.getAccidentLocationCharacteristics());
        report.setDirectionOfA(requestAlarmDto.getDirectionOfA());
        report.setDirectionOfB(requestAlarmDto.getDirectionOfB());
        report.setFaultRatioA(requestAlarmDto.getFaultRatioA());
        report.setFaultRatioB(requestAlarmDto.getFaultRatioB());
        report.setAccidentType(requestAlarmDto.getAccidentType());

        requestAiReportRepository.save(report);
    }
}
