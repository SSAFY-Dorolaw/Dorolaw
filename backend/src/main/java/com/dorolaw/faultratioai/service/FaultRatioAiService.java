package com.dorolaw.faultratioai.service;

import com.dorolaw.faultratioai.dto.request.FaultRatioRequestDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioResponseDto;
import com.dorolaw.faultratioai.entity.FaultAnalysis;
import com.dorolaw.faultratioai.reposiroty.FaultAnalysisRepository;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

// 과실 비율 분석기
@Service
@RequiredArgsConstructor
public class FaultRatioAiService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RabbitTemplate rabbitTemplate;
    private final FaultAnalysisRepository faultAnalysisRepository;

    
    @Transactional
    public FaultRatioResponseDto sendratioDiagnosisRequest(String authorizationHeader, FaultRatioRequestDto requestData) {

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        FaultAnalysis faultAnalysis = new FaultAnalysis();
        faultAnalysis.assignMemberId(memberId);
        faultAnalysis.changeTitle(requestData.getTitle());
        faultAnalysis.updateFileName(requestData.getFileName());
        faultAnalysis.makePublic(requestData.isPublic());

        FaultAnalysis savedFaultAnalysis = faultAnalysisRepository.save(faultAnalysis);
        // rabbit에 보내주기.
        rabbitTemplate.convertAndSend("main_diagnosis_queue", savedFaultAnalysis);

        return new FaultRatioResponseDto(
                savedFaultAnalysis.getFaultAnalysisId(),
                savedFaultAnalysis.getFileName(),
                savedFaultAnalysis.getMemberId()
        );
    }
}
