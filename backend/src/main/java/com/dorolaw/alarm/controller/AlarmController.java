package com.dorolaw.alarm.controller;

import com.dorolaw.alarm.dto.request.RequestAlarmDto;
import com.dorolaw.alarm.entity.Alarm;
import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.service.AlarmService;
import com.dorolaw.alarm.service.FcmService;
import com.dorolaw.faultanalysis.service.FaultAnalysisAiReportService;
import com.dorolaw.request.service.AiReportService;
import com.dorolaw.request.service.RequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alarms")
@RequiredArgsConstructor
@Slf4j
public class AlarmController {

    private final FcmService fcmService;
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
        tokens.addAll(alarmService.findLawyersByTags(requestAlarmDto.getAccidentObject())); // 태그들로 변호사들 조회
        return sendAlarms(tokens,requestAlarmDto.getContent());
    }

    // 과실 비율 분석기 관련 알림
    @PostMapping("/analysis")
    public String sendFaultrationaiAlarms(@RequestBody RequestAlarmDto requestAlarmDto) {
        log.info("requestAlarmDto: {}", requestAlarmDto);
        // report 저장
        faultAnalysisAiReportService.saveAnalysisReport(requestAlarmDto);
        log.info("Ai repor 저장 완료됨");

        // 알림 보내기
        List<FcmToken> tokens = alarmService.findTokenListByMemberId(requestAlarmDto.getMemberId()); // memberId로 fcm 토큰들 조회
        return sendAlarms(tokens,requestAlarmDto.getContent());
    }

    // 상담 예약 확인 알림 - 일반인, 변호사 - 백엔드
    // FIXME
    @PostMapping("/consultations")
    public String checkConsultation(@RequestBody String body, @RequestBody Long consultationId) {
        List<FcmToken> tokens = alarmService.findConsultationByconsultationId(consultationId); // 상담 id로 일반인, 변호사 조회
        return sendAlarms(tokens,body);
    }

    // 알람 보내기
    private String sendAlarms(List<FcmToken> tokens, String body) {
        for (FcmToken token : tokens) {
            fcmService.sendNotification(token.getToken(), body);
            alarmService.save(token,body);
        }
        return "알림 전송 요청 완료";
    }

    // 알림 리스트 조회
    @GetMapping("/myList/{memberId}")
    public List<Alarm> getMyAlarmList(@PathVariable Long memberId) {
        return alarmService.getMyList(memberId);
    }
}

