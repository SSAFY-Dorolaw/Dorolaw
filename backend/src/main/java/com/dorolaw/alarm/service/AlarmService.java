package com.dorolaw.alarm.service;

import com.dorolaw.alarm.entity.Alarm;
import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.repository.AlarmRepository;
import com.dorolaw.alarm.repository.FcmTokenRepository;
import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.repository.ConsultationRepository;
import com.dorolaw.member.entity.lawyer.LawyerSpeciality;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {
    private final FcmTokenRepository fcmTokenRepository;
    private final AlarmRepository alarmRepository;
    private final ConsultationRepository consultationRepository;
    
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
    public List<FcmToken> findConsultationByconsultationId(Long consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId).get();
        List<FcmToken> tokens = new ArrayList<>();
        tokens.addAll(fcmTokenRepository.findByMember_MemberId(consultation.getClient().getMemberId()));
        tokens.addAll(fcmTokenRepository.findByMember_MemberId(consultation.getLawyer().getMember().getMemberId()));
        return tokens;
    }

    // 알람 내역 저장
    public void save(FcmToken token, String body) {
        Alarm alarm = Alarm.builder()
                .receiveMemberId(token.getMember().getMemberId())
                .isRead(false)
                .content(body)
                .build();
        alarmRepository.save(alarm);
    }
    
    // memberId로 알람 조회하기
    public List<Alarm> getMyList(Long memberId) {
        return alarmRepository.findByReceiveMemberIdOrderByCreatedAtDesc(memberId);
    }
}
