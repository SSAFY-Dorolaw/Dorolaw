package com.dorolaw.faultanalysis.service;

import com.dorolaw.alarm.dto.request.AnalysisAlarmDto;
import com.dorolaw.faultanalysis.entity.FaultAnalysis;
import com.dorolaw.faultanalysis.entity.FaultAnalysisAIReport;
import com.dorolaw.faultanalysis.reposiroty.FaultAnalysisAiReportRepository;
import com.dorolaw.faultanalysis.reposiroty.FaultAnalysisRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FaultAnalysisAiReportService {

    private final FaultAnalysisRepository faultAnalysisRepository;
    private final FaultAnalysisAiReportRepository faultAnalysisAiReportRepository;

    @Transactional
    public void saveAnalysisReport(AnalysisAlarmDto requestAlarmDto) {
        FaultAnalysis faultAnalysis = faultAnalysisRepository.getReferenceById(requestAlarmDto.getFaultAnalysisId());
        FaultAnalysisAIReport report = new FaultAnalysisAIReport();
        report.setFaultAnalysis(faultAnalysis);
        report.setAccidentObject(requestAlarmDto.getAccidentObject());
        report.setAccidentLocation(requestAlarmDto.getAccidentLocation());
        report.setAccidentLocationCharacteristics(requestAlarmDto.getAccidentLocationCharacteristics());
        report.setDirectionOfA(requestAlarmDto.getDirectionOfA());
        report.setDirectionOfB(requestAlarmDto.getDirectionOfB());
        report.setFaultRatioA(requestAlarmDto.getFaultRatioA());
        report.setFaultRatioB(requestAlarmDto.getFaultRatioB());
        report.setAccidentType(requestAlarmDto.getAccidentType());

        faultAnalysisAiReportRepository.save(report);
    }
}
