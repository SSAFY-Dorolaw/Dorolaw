package com.dorolaw.faultanalysis.service;

import com.dorolaw.faultanalysis.dto.AiFaultDto;
import com.dorolaw.faultanalysis.dto.request.FaultAnalysisCreateReqDto;
import com.dorolaw.faultanalysis.dto.request.FaultAnalysisUpdateReqDto;
import com.dorolaw.faultanalysis.dto.response.FaultAnalysisListResponseDto;
import com.dorolaw.faultanalysis.dto.response.FaultRatioBoardResponseDto;
import com.dorolaw.faultanalysis.dto.response.FaultRatioBoardUpdateResponseDto;
import com.dorolaw.faultanalysis.entity.FaultAnalysis;
import com.dorolaw.faultanalysis.entity.FaultAnalysisAIReport;
import com.dorolaw.faultanalysis.entity.FaultAnalysisStatus;
import com.dorolaw.faultanalysis.reposiroty.FaultAnalysisAiReportRepository;
import com.dorolaw.faultanalysis.reposiroty.FaultAnalysisRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final FaultAnalysisAiReportRepository faultAnalysisAIReportsRepository;

    // AI 분석 게시판 등록
    @Transactional
    public AiFaultDto createFaultAnalysis(String authorizationHeader, FaultAnalysisCreateReqDto dto) {
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(token));

        FaultAnalysis faultAnalysis = new FaultAnalysis();
        faultAnalysis.setMemberId(memberId);
        faultAnalysis.setTitle(dto.getTitle());
        faultAnalysis.setFileName(dto.getFileName());
        faultAnalysis.setIsPublic(dto.getIsPublic());
        faultAnalysis.setStatus(FaultAnalysisStatus.PENDING); // 초기 상태 설정
        FaultAnalysis savedAnalysis = faultAnalysisRepository.save(faultAnalysis);

        AiFaultDto res = new AiFaultDto();
        res.setFaultAnalysisId(savedAnalysis.getFaultAnalysisId());
        res.setFileName(savedAnalysis.getFileName());
        res.setMemberId(savedAnalysis.getMemberId());
        return res;
    }

    @Transactional
    public FaultRatioBoardUpdateResponseDto updateFaultAnalysis(String authorizationHeader, FaultAnalysisUpdateReqDto updateRequestDto) {

        String extractToken = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(extractToken));


        FaultAnalysis faultAnalysis = faultAnalysisRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));


        if (!faultAnalysis.getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        if (updateRequestDto.getTitle() != null) {
            faultAnalysis.setTitle(updateRequestDto.getTitle());
        }

        if (updateRequestDto.getIsPublic() != null) {
            faultAnalysis.setIsPublic(updateRequestDto.getIsPublic());
        }

        faultAnalysis.setUpdatedAt(LocalDateTime.now());

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
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!faultAnalysis.getMemberId().equals(memberId)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        faultAnalysisAIReportsRepository.deleteByFaultAnalysis(faultAnalysis);

        faultAnalysisRepository.delete(faultAnalysis);
    }

    public FaultRatioBoardResponseDto getFaultAnalysisDetail(Long faultAnalysisId) {

        FaultAnalysis faultAnalysis = faultAnalysisRepository.findById(faultAnalysisId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

        FaultRatioBoardResponseDto responseDto = FaultRatioBoardResponseDto.builder()
                .faultAnalysisId(faultAnalysis.getFaultAnalysisId())
                .memberId(faultAnalysis.getMemberId())
                .title(faultAnalysis.getTitle())
                .fileName(faultAnalysis.getFileName())
                .isPublic(faultAnalysis.getIsPublic())
                .build();

        // Optional을 사용하여 faultAiReport가 존재하는 경우에만 처리
        Optional<FaultAnalysisAIReport> faultAiReportOptional = faultAnalysisAIReportsRepository.findByFaultAnalysis(faultAnalysis);

        if (faultAiReportOptional.isPresent()) {
            FaultAnalysisAIReport faultAiReport = faultAiReportOptional.get();
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
            responseDto.setAiReport(null);
        }

        return responseDto;
    }

    public Page<FaultAnalysisListResponseDto> getPublicFaultAnalysisList(Long memberId, Pageable pageable) {

        Page<FaultAnalysis> faultAnalysisPage = faultAnalysisRepository.findByMemberIdOrIsPublicTrue(memberId, pageable);
        return faultAnalysisPage.map(FaultAnalysisListResponseDto::fromEntity);
    }
}
