package com.dorolaw.request.service;

import com.dorolaw.alarm.dto.request.RequestAlarmDto;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.repository.MemberRepository;
import com.dorolaw.request.dto.AiRequestDto;
import com.dorolaw.request.dto.request.RequestCreateDto;
import com.dorolaw.request.dto.request.RequestUpdateDto;
import com.dorolaw.request.dto.response.ReqeustListResDto;
import com.dorolaw.request.dto.response.RequestDetailDto;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.entity.RequestStatus;
import com.dorolaw.request.entity.RequestTag;
import com.dorolaw.request.repository.RequestRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public AiRequestDto createRequest(String authorizationHeader, RequestCreateDto dto) {
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.valueOf(jwtTokenProvider.getMemberIdFromJWT(token));

        // 빈 member 등록
        Member member = memberRepository.getReferenceById(memberId);

        Request request = new Request();
        request.setMember(member);
        request.setTitle(dto.getTitle());
        request.setFileName(dto.getFileName());
        request.setInsuranceFaultRatio(dto.getInsuranceFaultRatio());
        request.setDescription(dto.getDescription());
        request.setQuestion(dto.getQuestion());
        request.setIsPublic(dto.getIsPublic());
        request.setStatus(RequestStatus.PENDING); // 초기 상태 설정
        request.setTag(RequestTag.NONE);
        Request saved = requestRepository.save(request);

        AiRequestDto res = new AiRequestDto();
        res.setRequestId(saved.getRequestId());
        res.setFileName(saved.getFileName());
        res.setMemberId(saved.getMember().getMemberId());
        return res;
    }

    @Transactional
    public void updateRequest(String authorizationHeader, Long requestId, RequestUpdateDto dto) {
        // 의뢰 존재 여부 확인
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new NoSuchElementException("의뢰를 찾을 수 없습니다."));

        // 작성자 확인
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(token));

        if(!memberId.equals(request.getMember().getMemberId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        
        // 수정
        request.setTitle(dto.getTitle());
        request.setInsuranceFaultRatio(dto.getInsuranceFaultRatio());
        request.setDescription(dto.getDescription());
        request.setQuestion(dto.getQuestion());
        request.setIsPublic(dto.getIsPublic());

        requestRepository.save(request);
    }

    @Transactional
    public void deleteRequest(String authorizationHeader, Long requestId) {
        // 의뢰 존재 여부 확인
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new NoSuchElementException("의뢰를 찾을 수 없습니다."));

        // 작성자 확인
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.parseLong(jwtTokenProvider.getMemberIdFromJWT(token));

        if(!memberId.equals(request.getMember().getMemberId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        
        // 삭제
        requestRepository.deleteById(requestId);
    }

    public RequestDetailDto getRequestDetail(Long requestId) {
        Request request = requestRepository.findRequestDetail(requestId)
                .orElseThrow(() -> new NoSuchElementException("해당 요청을 찾을 수 없습니다."));

        // DTO로 변환
        return RequestDetailDto.fromEntity(request);
    }

    public Page<ReqeustListResDto> getRequestList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Request> requests = requestRepository.findAllByIsPublicTrueOrderByCreatedAtDesc(pageable);

        return requests.map(ReqeustListResDto::fromEntity);
    }
    
    // tag 수정하기
    @Transactional
    public void updateTag(RequestAlarmDto requestAlarmDto) {
        // 의뢰 존재 여부 확인
        Request request = requestRepository.findById(requestAlarmDto.getRequestId())
                .orElseThrow(() -> new NoSuchElementException("의뢰를 찾을 수 없습니다."));

        // 작성자 확인
        if(!requestAlarmDto.getMemberId().equals(request.getMember().getMemberId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        // 수정
        request.setTag(RequestTag.valueOf(requestAlarmDto.getAccidentObject()));
        requestRepository.save(request);
    }
}
