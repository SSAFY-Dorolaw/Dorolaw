package com.dorolaw.alarm.service;

import com.dorolaw.alarm.dto.response.AlarmDTO;
import com.dorolaw.alarm.entity.Alarm;
import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.repository.AlarmRepository;
import com.dorolaw.alarm.repository.FcmTokenRepository;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerSpeciality;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.LawyerTagRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmService {
    private final FcmTokenRepository fcmTokenRepository;
    private final AlarmRepository alarmRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FcmService fcmService;
    private final LawyerTagRepository lawyerTagRepository;
    private final LawyerProfileRepository lawyerProfileRepository;

    // 의뢰 요청자에게 알림 보내기
    public void sendReportFinishedAlarm(Long memberId, String content, Long requestId) {
        FcmToken token = fcmService.getLatestFcmTokenByMemberId(memberId); // memberId로 fcm 토큰들 조회
        sendAlarm(token,content+"("+requestId+")");
    }

    // 사고유형과 관련된 변호사에게 알림 보내기
    public void sendLawyersAlarm(String accidentObject, Long requestId) {
        if(accidentObject.equals("차대 이륜차")) accidentObject = "차대이륜차";

        // 알림보낼 member의 memberId 찾기
        List<Long> lawyerIds = lawyerTagRepository.findDistinctLawyersBySpeciality(LawyerSpeciality.valueOf(accidentObject)).stream()
                .map(Member::getMemberId)
                .collect(Collectors.toList());

        // fcm token 찾기
        List<FcmToken> tokens = lawyerTagRepository.findLatestTokensByMemberIds(lawyerIds); // 태그들로 변호사들 조회

        // 알림들 보내기
        sendAlarms(tokens,accidentObject + " 태그와 관련된 요청이 등록되었습니다.("+requestId+")");
    }

    // 상담 예약 확인 알림
    public void sendConsultationConfirmAlarms(Long lawyerProfileId, Long clientId, String date, Long requestId) {
        // 변호사 memberId 찾기
        Long lawyerId = lawyerProfileRepository.findById(lawyerProfileId).get().getMember().getMemberId();
        
        // list에 담기
        List<Long> memberIds = new ArrayList<>();
        memberIds.add(clientId);
        memberIds.add(lawyerId);

        // 일반인, 변호사의 fcm token 조회
        List<FcmToken> tokens = fcmTokenRepository.findLatestTokensByMemberIds(memberIds);

        // 알림들 보내기
        sendAlarms(tokens,date + "에 상담이 확정되었습니다.("+requestId+")");
    }
    
    // 답변 알람
    public void sendAnswerAlarm(String title, Long memberId, Long requestId) {
        FcmToken token = fcmService.getLatestFcmTokenByMemberId(memberId);
        sendAlarm(token,"의뢰글 [" + title + "] 에 변호사 답변이 작성되었습니다. (" + requestId+")");
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
    
    // 알람 보내기
    public void sendAlarm(FcmToken token, String body) {
        fcmService.sendNotification(token.getToken(), body);
        saveAlarm(token,body);
    }
    
    // 알람 여러개 보내기
    public void sendAlarms(List<FcmToken> tokens, String body) {
        for(FcmToken token : tokens) {
            fcmService.sendNotification(token.getToken(), body);
            saveAlarm(token,body);
        }
    }
    
    // memberId로 알람 조회하기
    public List<AlarmDTO> getMyList(Long memberId) {
        List<Alarm> alarms = alarmRepository.findAlarmsByMemberIdOrderByCreatedAtDesc(memberId);
        return alarms.stream()
                .map(AlarmDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // 선택한 알림 읽음 처리하기
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
    
    // 사용자의 모든 알림 읽음 처리하기
    @Transactional
    public void markAllAsRead(String authorizationHeader) {
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.valueOf(jwtTokenProvider.getMemberIdFromJWT(token));

        alarmRepository.markAllAsReadByMemberId(memberId);
    }
}
