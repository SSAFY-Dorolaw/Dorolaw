package com.dorolaw.alarm.controller;

import com.dorolaw.alarm.dto.request.AnalysisAlarmDto;
import com.dorolaw.alarm.dto.request.RequestAlarmDto;
import com.dorolaw.alarm.dto.response.AlarmDTO;
import com.dorolaw.alarm.service.AlarmService;
import com.dorolaw.faultanalysis.service.FaultAnalysisAiReportService;
import com.dorolaw.request.service.AiReportService;
import com.dorolaw.request.service.RequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alarms")
@RequiredArgsConstructor
@Slf4j
public class AlarmController {

    private final AlarmService alarmService;
    private final AiReportService requestAiReportService;
    private final FaultAnalysisAiReportService faultAnalysisAiReportService;
    private final RequestService requestService;

    // 의뢰 관련 알림
    @PostMapping("/requests")
    public String sendReqeustAlarms(@RequestBody RequestAlarmDto requestAlarmDto) {
        log.info("requestAlarmDto: {}", requestAlarmDto);
        // report 저장
        requestAiReportService.saveReqeustReport(requestAlarmDto);
        log.info("Ai repor 저장 완료됨");

        // request tag 수정
        requestService.updateTag(requestAlarmDto);
        log.info("Request tag 추가");
        
        // 의뢰 요청자에게 알림 보내기
        alarmService.sendReportFinishedAlarm(requestAlarmDto.getMemberId(),requestAlarmDto.getContent(),requestAlarmDto.getRequestId());
        
        // 사고유형과 관련된 변호사에게 알림 보내기
        alarmService.sendLawyersAlarm(requestAlarmDto.getAccidentObject(),requestAlarmDto.getRequestId());

        return "의뢰 요청과 관련된 알림을 보냈습니다.";
    }

    // 과실 비율 분석기 관련 알림
    @PostMapping("/analysis")
    public String sendFaultrationaiAlarms(@RequestBody AnalysisAlarmDto analysisAlarmDto) {
        log.info("requestAlarmDto: {}", analysisAlarmDto);
        // report 저장
        faultAnalysisAiReportService.saveAnalysisReport(analysisAlarmDto);
        log.info("Ai repor 저장 완료됨");

        // 의뢰 요청자에게 알림 보내기
        alarmService.sendReportFinishedAlarm(analysisAlarmDto.getMemberId(),analysisAlarmDto.getContent(),analysisAlarmDto.getFaultAnalysisId());

        return "과실 비율 분석 관련 알림을 보냈습니다.";
    }

    // 알림 리스트 조회
    @GetMapping("/myList/{memberId}")
    public List<AlarmDTO> getMyAlarmList(@PathVariable Long memberId) {
        return alarmService.getMyList(memberId);
    }

    // 읽음 처리
    @PutMapping("/read/{alarmId}")
    public ResponseEntity<Void> read(@PathVariable Long alarmId) {
        alarmService.markAsRead(alarmId);
        return ResponseEntity.ok().build();
    }

    // 모두 읽음 처리
    @PutMapping("/read-all")
    public ResponseEntity<Void> readAll(@RequestHeader("Authorization") String authorizationHeader) {
        alarmService.markAllAsRead(authorizationHeader);
        return ResponseEntity.ok().build();
    }
}

