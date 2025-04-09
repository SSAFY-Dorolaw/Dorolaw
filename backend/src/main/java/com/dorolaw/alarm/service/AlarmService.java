package com.dorolaw.alarm.service;

import com.dorolaw.alarm.dto.response.AlarmDTO;
import com.dorolaw.alarm.entity.Alarm;
import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.repository.AlarmRepository;
import com.dorolaw.alarm.repository.FcmTokenRepository;
import com.dorolaw.member.entity.lawyer.LawyerSpeciality;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlarmService {
    private final FcmTokenRepository fcmTokenRepository;
    private final AlarmRepository alarmRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FcmService fcmService;
    
    // memberId로 fcm 토큰 찾기
    public List<FcmToken> findTokenListByMemberId(Long memberId) {
        return fcmTokenRepository.findByMember_MemberId(memberId);
    }
    
    // tag로 fcm 토큰 찾기
    public List<FcmToken> findLawyersByTags(String tag) {
        if(tag.equals("차대 이륜차")) tag = "차대이륜차";
        return fcmTokenRepository.findLawyersByTags(LawyerSpeciality.valueOf(tag));
    }
    
    // 상담id로 fcm 토큰 찾기
    public List<FcmToken> findConsultationByconsultationId(Long lawyerId, Long clientId) {
        List<FcmToken> tokens = new ArrayList<>();
        tokens.addAll(fcmTokenRepository.findByMember_MemberId(lawyerId));
        tokens.addAll(fcmTokenRepository.findByMember_MemberId(clientId));
        return tokens;
    }

    // 알람 내역 저장
    public void saveAlarm(FcmToken token, String body) {
        Alarm alarm = Alarm.builder()
                .receiveMember(token.getMember())
                .isRead(false)
                .content(body)
                .build();
        alarmRepository.save(alarm);
    }

    // 상담 예약 확인 알림 - 일반인, 변호사 - 백엔드
    public void checkConsultation(Long lawyerId, Long clientId, String date) {
        List<FcmToken> tokens = findConsultationByconsultationId(lawyerId, clientId); // 상담 id로 일반인, 변호사 조회
        sendAlarms(tokens,date + "에 상담이 확정되었습니다.");
    }
    
    // 알람 보내기
    public String sendAlarms(List<FcmToken> tokens, String body) {
        for (FcmToken token : tokens) {
            fcmService.sendNotification(token.getToken(), body);
            saveAlarm(token,body);
        }
        return "알림 전송 요청 완료";
    }
    
    // memberId로 알람 조회하기
    public List<AlarmDTO> getMyList(Long memberId) {
        List<Alarm> alarms = alarmRepository.findAlarmsByMemberIdOrderByCreatedAtDesc(memberId);
        return alarms.stream()
                .map(AlarmDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long alarmId) {
        // 조회
        Alarm alarm = alarmRepository.findById(alarmId)
                .orElseThrow(() -> new NoSuchElementException("Alarm not found with id: " + alarmId));
        // 이미 읽은 상태가 아니면 변경
        if (!alarm.getIsRead()) {
            alarm.markAsRead();
        }
        
        // 저장
        alarmRepository.save(alarm);
    }

    @Transactional
    public void markAllAsRead(String authorizationHeader) {
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.valueOf(jwtTokenProvider.getMemberIdFromJWT(token));

        alarmRepository.markAllAsReadByMemberId(memberId);
    }
}
