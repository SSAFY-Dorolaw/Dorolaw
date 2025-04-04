package com.dorolaw.faultratioai.service;

import com.dorolaw.faultratioai.dto.request.FaultRatioBoardRequestDto;
import com.dorolaw.faultratioai.entity.FaultAnalysis;
import com.dorolaw.faultratioai.reposiroty.FaultAnalysisRepository;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FaultAnalysisService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final FaultAnalysisRepository faultAnalysisRepository;

    // AI 분석 게시판 등록
    @Transactional
    public void createFaultAnalysis(String authorizationHeader, FaultRatioBoardRequestDto requestDto) {

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
        String memberRole = jwtTokenProvider.getRoleFromJWT(extractToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        FaultAnalysis faultAnalysis = FaultAnalysis.builder()
                .memberId(memberId)
                .title(requestDto.getTitle())
                .fileName(requestDto.getFileName())
                .isPublic(requestDto.getIsPublic())
                .status(FaultAnalysis.Status.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        FaultAnalysis savedAnalysis = faultAnalysisRepository.save(faultAnalysis);
    }



}
