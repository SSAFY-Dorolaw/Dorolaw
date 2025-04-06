package com.dorolaw.member.service;

import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.entity.ConsultationType;
import com.dorolaw.consultation.repository.ConsultationRepository;
import com.dorolaw.faultanalysis.entity.FaultAnalysisAIReport;
import com.dorolaw.faultanalysis.reposiroty.FaultAnalysisAiReportRepository;
import com.dorolaw.member.dto.response.*;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.request.entity.Answer;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.repository.AnswerRepository;
import com.dorolaw.request.repository.RequestRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final ConsultationRepository consultationRepository;
    private final MemberRepository memberRepository;
    private final LawyerProfileRepository lawyerProfileRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RequestRepository requestRepository;
    private final AnswerRepository answerRepository;
    private final FaultAnalysisAiReportRepository faultAnalysisAiReportsRepository;

    public ConsultationResponseDto getAllConsultations(String authorizationHeader){

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        List<Consultation> consultations = consultationRepository.findByClientOrLawyer(member, lawyerProfile);

        List<ConsultationResponseDto.ConsultationDetail> consultationDetails = consultations.stream()
                .map(consultation -> ConsultationResponseDto.ConsultationDetail.builder()
                        .consultationId(consultation.getConsultationId())
                        .scheduledDate(consultation.getConsultationDate().toString() + " " + consultation.getScheduledTime().toString())
                        .consultationMethod(consultation.getConsultationType() == ConsultationType.VISIT ? "VISIT" : "PHONE")
                        .status(consultation.getStatus().toString())
                        .clientId(consultation.getClient().getMemberId())
                        .clientName(consultation.getClient().getName())
                        .lawyerId(consultation.getLawyer().getLawyerProfileId())
                        .lawyerName(consultation.getLawyer().getMember().getName())
                        .requestId(consultation.getRequest().getRequestId())
                        .requestTitle(consultation.getRequest().getTitle())
                        .build())
                .collect(Collectors.toList());

        return ConsultationResponseDto.builder()
                .consultations(consultationDetails)
                .build();
    }

    // 일반 사용자의 모든 의뢰 내역 조회
    public ClientRequestResponseDto getClientRequests (String authorizationHeader){

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        List<Request> requests = requestRepository.findByMember_MemberId(memberId);

        List<ClientRequestResponseDto.ClientRequestDetail> clientRequestDetails = requests.stream()
                .map(request -> ClientRequestResponseDto.ClientRequestDetail.builder()
                        .requestId(request.getRequestId())
                        .title(request.getTitle())
                        .status(request.getStatus().toString())
                        .faultRatioA(request.getAiReport().getFaultRatioA())
                        .faultRatioB(request.getAiReport().getFaultRatioB())
                        .createdAt(request.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                        .build())
                .collect(Collectors.toList());

        return ClientRequestResponseDto.builder()
                .requests(clientRequestDetails)
                .build();
    }

    public List<AiReportResponseDto> getAllReportsForMember(String authorizationHeader) {

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");
        List<FaultAnalysisAIReport> reports = faultAnalysisAiReportsRepository.findAllByMemberId(memberId);

        return reports.stream()
                .map(report -> AiReportResponseDto.builder()
                        .reportId(report.getReportId())
                        .fileName(report.getFaultAnalysis().getFileName())
                        .faultRatioA(report.getFaultRatioA())
                        .faultRatioB(report.getFaultRatioB())
                        .reportCreatedAt(report.getCreatedAt())
                        .isPublic(report.getFaultAnalysis().getIsPublic())
                        .build())
                .collect(Collectors.toList());
    }

    public List<LawyerConsultationResponse> getLawyerConsultations(String authorizationHeader) {

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        List<Consultation> consultations = consultationRepository
                .findByLawyer_LawyerProfileIdOrderByCreatedAtDesc(lawyerProfile.getLawyerProfileId());

        return consultations.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private LawyerConsultationResponse convertToResponse(Consultation consultation) {

        String consultationType = consultation.getConsultationType().toString();

        String status = consultation.getStatus().toString();

        return LawyerConsultationResponse.builder()
                .consultationId(consultation.getConsultationId())
                .clientName(consultation.getClient().getName())
                .requestId(consultation.getRequest().getRequestId())
                .requestTitle(consultation.getRequest().getTitle())
                .requestContent(consultation.getRequest().getDescription())
                .additionalQuestion(consultation.getAdditionalQuestion())
                .consultationStatus(status)
                .consultationDate(consultation.getConsultationDate())
                .consultationTime(consultation.getScheduledTime())
                .consultationType(consultationType)
                .build();
    }

    public List<LawyerAnsweredInquiryListResponseDto> getAnsweredRequestList(String authorizationHeader){
        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        LawyerProfile lawyerProfile = lawyerProfileRepository.findByMember_MemberId(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        // 변호사 ID로 답변 목록과 연관된 의뢰 정보를 함께 조회
        List<Answer> answers = answerRepository.findByLawyerIdWithRequest(lawyerProfile.getLawyerProfileId());

        return answers.stream()
                .map(answer -> LawyerAnsweredInquiryListResponseDto.builder()
                        .requestId(answer.getRequest().getRequestId())
                        .title(answer.getRequest().getTitle())
                        .memberId(answer.getRequest().getMember().getMemberId())
                        .requestAnsweredContent(answer.getContent())
                        .answeredAt(answer.getCreatedAt())
                        .isSelected(answer.getIsSelected())
                        .requestStatus(answer.getRequest().getStatus().toString())
                        .build())
                .collect(Collectors.toList());
    }
}
