package com.dorolaw.alarm.controller;

import com.dorolaw.alarm.entity.Alarm;
import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.repository.FcmTokenRepository;
import com.dorolaw.alarm.service.AlarmService;
import com.dorolaw.alarm.service.FcmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alarms")
@RequiredArgsConstructor
public class AlarmController {

    private final FcmTokenRepository tokenRepository;
    private final FcmService fcmService;
    private final AlarmService alarmService;

    // 테스트용
    @PostMapping("/test")
    public String sendNotificationToAll(@RequestBody String body) {
        List<FcmToken> tokens = tokenRepository.findAll();
        return sendAlarms(tokens,body);
    }

    // 분석 리포트 완료 알림 - 일반인 - fast api
    @PostMapping("/me")
    public String senedToMe(@RequestBody String body, @RequestBody Long memberId) {
        List<FcmToken> tokens = alarmService.findTokenListByMemberId(memberId); // memberId로 fcm 토큰들 조회
        return sendAlarms(tokens,body);
    }

    // 관련된 태그 변호사에게 알림 - fast api
    @PostMapping("/lawyers")
    public String senedToLawyers(@RequestBody String body, @RequestBody String tag) {
        List<FcmToken> tokens = alarmService.findLawyersByTags(tag); // 태그들로 변호사들 조회
        return sendAlarms(tokens,body);
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
    public List<Alarm> getMyList(@PathVariable Long memberId) {
        return alarmService.getMyList(memberId);
    }
}

