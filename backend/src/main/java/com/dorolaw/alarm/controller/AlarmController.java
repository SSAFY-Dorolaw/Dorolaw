package com.dorolaw.alarm.controller;

import com.dorolaw.alarm.dto.request.AnalysisAlarmDto;
import com.dorolaw.alarm.dto.request.RequestAlarmDto;
import com.dorolaw.alarm.dto.response.AlarmDTO;
import com.dorolaw.alarm.entity.FcmToken;
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
        
        // 알림 보내기
        List<FcmToken> tokens = alarmService.findTokenListByMemberId(requestAlarmDto.getMemberId()); // memberId로 fcm 토큰들 조회
        alarmService.sendAlarms(tokens,requestAlarmDto.getContent());
        List<FcmToken> tokens2 = alarmService.findLawyersByTags(requestAlarmDto.getAccidentObject()); // 태그들로 변호사들 조회
        return alarmService.sendAlarms(tokens2,requestAlarmDto.getAccidentObject() + " 태그와 관련된 요청이 등록되었습니다.");
    }

    // 과실 비율 분석기 관련 알림
    @PostMapping("/analysis")
    public String sendFaultrationaiAlarms(@RequestBody AnalysisAlarmDto analysisAlarmDto) {
        log.info("requestAlarmDto: {}", analysisAlarmDto);
        // report 저장
        faultAnalysisAiReportService.saveAnalysisReport(analysisAlarmDto);
        log.info("Ai repor 저장 완료됨");

        // 알림 보내기
        List<FcmToken> tokens = alarmService.findTokenListByMemberId(analysisAlarmDto.getMemberId()); // memberId로 fcm 토큰들 조회
        return alarmService.sendAlarms(tokens,analysisAlarmDto.getContent());
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

