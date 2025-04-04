package com.dorolaw.faultratioai.service;

import com.dorolaw.faultratioai.dto.request.FaultRatioBoardRequestDto;
import com.dorolaw.faultratioai.dto.request.FaultRatioBoardUpdateRequestDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioBoardResponseDto;
import com.dorolaw.faultratioai.dto.response.FaultRatioBoardUpdateResponseDto;
import com.dorolaw.faultratioai.entity.FaultAnalysis;
import com.dorolaw.faultratioai.entity.FaultAnalysisAIReports;
import com.dorolaw.faultratioai.reposiroty.FaultAnalysisAiReportsRepository;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FaultAnalysisService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final FaultAnalysisRepository faultAnalysisRepository;
    private final FaultAnalysisAiReportsRepository faultAnalysisAIReportsRepository;

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

    public FaultRatioBoardResponseDto getFaultAnalysisDetail(String authorizationHeader, Long faultAnalysisId) {

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));
        String memberRole = jwtTokenProvider.getRoleFromJWT(extractToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        FaultAnalysis faultAnalysis = faultAnalysisRepository.findById(faultAnalysisId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

        FaultRatioBoardResponseDto responseDto = FaultRatioBoardResponseDto.builder()
                .faultAnalysisId(faultAnalysis.getFaultAnalysisId())
                .memberId(faultAnalysis.getMemberId())
                .title(faultAnalysis.getTitle())
                .fileName(faultAnalysis.getFileName())
                .isPublic(faultAnalysis.isPublic())
                .build();

        // Optional을 사용하여 faultAiReport가 존재하는 경우에만 처리
        Optional<FaultAnalysisAIReports> faultAiReportOptional = faultAnalysisAIReportsRepository.findByFaultAnalysis(faultAnalysis);

        if (faultAiReportOptional.isPresent()) {
            FaultAnalysisAIReports faultAiReport = faultAiReportOptional.get();
            FaultRatioBoardResponseDto.FaultAiReportDataDto aiReportDto = responseDto.new FaultAiReportDataDto();
            aiReportDto.setReportId(faultAiReport.getReportId());
            aiReportDto.setFaultAnalysisId(faultAnalysis.getFaultAnalysisId());
            aiReportDto.setCreateAt(faultAiReport.getCreatedAt());
            aiReportDto.setUpdatedAt(faultAiReport.getUpdatedAt());
            aiReportDto.setAccidentObject(faultAiReport.getAccidentObject());
            aiReportDto.setAccidentLocation(faultAiReport.getAccidentLocation());
            aiReportDto.setAccidentLocationCharacteristics(faultAiReport.getAccidentLocationCharacteristics());
            aiReportDto.setDirectionOfA(faultAiReport.getDirectionOfA());
            aiReportDto.setDirectionOfB(faultAiReport.getDirectionOfB());
            aiReportDto.setFaultRatioA(faultAiReport.getFaultRatioA());
            aiReportDto.setFaultRatioB(faultAiReport.getFaultRatioB());
            aiReportDto.setAccidentType(faultAiReport.getAccidentType());

            responseDto.setAiReport(aiReportDto);
        } else {
            // faultAiReport가 존재하지 않으면 aiReport 필드를 null로 설정
            responseDto.setAiReport(null);
        }

        return responseDto;
    }

    @Transactional
    public FaultRatioBoardUpdateResponseDto updateFaultAnalysis(String authorizationHeader, FaultRatioBoardUpdateRequestDto updateRequestDto) {

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));


        FaultAnalysis faultAnalysis = faultAnalysisRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fault analysis not found"));


        if (!faultAnalysis.getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to update this analysis");
        }

        if (updateRequestDto.getTitle() != null) {
            faultAnalysis.changeTitle(updateRequestDto.getTitle());
        }

        if (updateRequestDto.getIsPublic() != null) {
            faultAnalysis.changePublicStatus(updateRequestDto.getIsPublic());
        }

        faultAnalysis.updateModificationTime();

        FaultAnalysis updatedAnalysis = faultAnalysisRepository.save(faultAnalysis);

        return FaultRatioBoardUpdateResponseDto.builder()
                .title(updatedAnalysis.getTitle())
                .updatedAt(updatedAnalysis.getUpdatedAt())
                .build();
    }

    @Transactional
    public void deleteFaultAnalysis(String authorizationHeader, Long requfaultAnalysisIdstId) {

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));

        FaultAnalysis faultAnalysis = faultAnalysisRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!faultAnalysis.getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        faultAnalysisAIReportsRepository.deleteByFaultAnalysis(faultAnalysis);

        faultAnalysisRepository.delete(faultAnalysis);
    }
}
