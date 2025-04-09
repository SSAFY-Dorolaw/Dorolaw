package com.dorolaw.alarm.service;

import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.repository.FcmTokenRepository;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {
    private final FcmTokenRepository fcmTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public void sendNotification(String token, String body) {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(Notification.builder()
                        .setBody(body)
                        .build())
                .build();
        try {
            FirebaseMessaging.getInstance().sendAsync(message).get();
        } catch (InterruptedException | ExecutionException e) {
            log.error(e.getMessage());
        }
    }

    @Transactional
    public void saveToken(String token, String authorizationHeader) {
        // JWT에서 memberId 파싱
        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
        Member member = memberRepository.getReferenceById(memberId);

        // 토큰 중복 확인
        Optional<FcmToken> existingToken = fcmTokenRepository.findByToken(token);
        if (existingToken.isPresent()) {
            // 같은 사용자인 경우
            if(existingToken.get().getMemberId().equals(memberId)) {
                // 최신화
                existingToken.get().setUpdatedAt(LocalDateTime.now());
                fcmTokenRepository.save(existingToken.get());
            }
            // 다른 사용자인 경우
            else {
                // 기존거 삭제
                fcmTokenRepository.delete(existingToken.get());
                
                // 새로 등록
                FcmToken fcmToken = new FcmToken();
                fcmToken.setMember(member);
                fcmToken.setToken(token);
                fcmTokenRepository.save(fcmToken);
            }
        }

        // 토큰 중복 안된경우 - 토큰 등록
        FcmToken fcmToken = new FcmToken();
        fcmToken.setMember(member);
        fcmToken.setToken(token);
        fcmTokenRepository.save(fcmToken);
    }

    public FcmToken getLatestFcmTokenByMemberId(Long memberId) {
        return fcmTokenRepository.findTopByMemberIdOrderByUpdatedAtDesc(memberId).get();
    }
}
