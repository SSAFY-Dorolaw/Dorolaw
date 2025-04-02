package com.dorolaw.faultratioai.service;

import com.dorolaw.alarm.dto.RequestAlarmDto;
import com.dorolaw.faultratioai.entity.AiReport;
import com.dorolaw.faultratioai.entity.FaultAnalysisAIReports;
import com.dorolaw.faultratioai.reposiroty.FaultAnalysisAiReport;
import com.dorolaw.faultratioai.reposiroty.ReqeustAiReportRepository;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// report 저장 용도
@Service
@RequiredArgsConstructor
public class AiReportService {

    private final ReqeustAiReportRepository requestAiReportRepository;
    private final FaultAnalysisAiReport factAnalysisRepository;
    private final RequestRepository requestRepository;

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

    public void saveAnalysisReport(RequestAlarmDto requestAlarmDto) {
        Request reqeust = requestRepository.getReferenceById(requestAlarmDto.getRequestId());
        FaultAnalysisAIReports report = new FaultAnalysisAIReports();
        report.setRequest(reqeust);
        report.setAccidentObject(requestAlarmDto.getAccidentObject());
        report.setAccidentLocation(requestAlarmDto.getAccidentLocation());
        report.setAccidentLocationCharacteristics(requestAlarmDto.getAccidentLocationCharacteristics());
        report.setDirectionOfA(requestAlarmDto.getDirectionOfA());
        report.setDirectionOfB(requestAlarmDto.getDirectionOfB());
        report.setFaultRatioA(requestAlarmDto.getFaultRatioA());
        report.setFaultRatioB(requestAlarmDto.getFaultRatioB());
        report.setAccidentType(requestAlarmDto.getAccidentType());

        factAnalysisRepository.save(report);
    }
}
