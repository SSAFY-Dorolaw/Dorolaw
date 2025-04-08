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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class FcmService {
    private final FcmTokenRepository tokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public String sendNotification(String token, String body) {
        Message message = Message.builder()
                .setToken(token)
                .setNotification(Notification.builder()
                        .setBody(body)
                        .build())
                .build();
        try {
            String response = FirebaseMessaging.getInstance().sendAsync(message).get();
            return response;
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return "전송 실패";
        }
    }

    @Transactional
    public FcmToken saveToken(String token, String authorizationHeader) {
        Optional<FcmToken> existingToken = tokenRepository.findByToken(token);
        if (existingToken.isPresent()) {
            // 이미 저장된 토큰이면 업데이트가 필요하다면 여기에 업데이트 로직 추가
            return existingToken.get();
        }

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
        Member member = memberRepository.getReferenceById(memberId);

        FcmToken fcmToken = new FcmToken();
        fcmToken.setMember(member);
        fcmToken.setToken(token);
        return tokenRepository.save(fcmToken);
    }
}
