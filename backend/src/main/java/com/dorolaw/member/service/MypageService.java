package com.dorolaw.member.service;

import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.entity.ConsultationType;
import com.dorolaw.consultation.repository.ConsultationRepository;
import com.dorolaw.member.dto.response.ClientRequestResponseDto;
import com.dorolaw.member.dto.response.ConsultationResponseDto;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.member.repository.LawyerProfileRepository;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
                        .clientId(consultation.getClient().getMemberId())
                        .clientName(consultation.getClient().getName())
                        .lawyerId(consultation.getLawyer().getLawyerProfileId())
                        .lawyerName(consultation.getLawyer().getMember().getName())
                        // 용국이 request코드 DEV-BE 머지되면, 여기서 Request 참조해서 caseId와 caseTitle 처리 필요.
                        .caseId(null)
                        .caseTitle(null)
                        .caseLink(null)
                        .build())
                .collect(Collectors.toList());

        return ConsultationResponseDto.builder()
                .status(consultationDetails.isEmpty() ? "EMPTY" : "Consultation Record Exists")
                .consultations(consultationDetails)
                .build();
    }

    public ClientRequestResponseDto getClientRequests (String authorizationHeader){

        Map<String, Object> memberInfo = jwtTokenProvider.extractMemberInfo(authorizationHeader);
        Long memberId = (Long) memberInfo.get("memberId");

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        // request merge되면 아래 내용 수정 필요함.
//        List<Request> requests = requestsRepository.findByMember(member);

//        List<ClientRequestResponseDto> clientRequestDetails = requests.stream()
//                .map(request -> ClientRequestResponseDto.builder())
//                .caseId(request.getRequestId())
//                .title(request.getTitle())
//                .createdAt(request.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
//                .status(request.getStatus().name().toLowerCase())
//                .videoUrl(request.getVideoUrl())
//                .reportUrl(request.getReportUrl())
//                .faultRatio(request.getInsuranceFaultRatio())
//                .consultationId(request.getConsultation() != null ? request.getConsultation().getConsultationId() : null)
//                .build())
//            .collect(Collectors.toList());
//
//        return ClientRequestResponseDto.builder()
//                .cases(clientRequestDetails)
//                .build();

    }

}
