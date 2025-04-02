package com.dorolaw.request.service;

import com.dorolaw.faultratioai.dto.request.AiRequestDto;
import com.dorolaw.request.dto.*;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.entity.RequestStatus;
import com.dorolaw.request.repository.RequestRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AiRequestDto createRequest(String authorizationHeader, RequestCreateDto dto) {
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.valueOf(jwtTokenProvider.getMemberIdFromJWT(token));

        Request request = new Request();
        request.setMemberId(memberId);
        request.setTitle(dto.getTitle());
        request.setFileName(dto.getFileName());
        request.setInsuranceFaultRatio(dto.getInsuranceFaultRatio());
        request.setDescription(dto.getDescription());
        request.setQuestion(dto.getQuestion());
        request.setIsPublic(dto.getIsPublic());
        request.setStatus(RequestStatus.PENDING); // 초기 상태 설정

        Request saved = requestRepository.save(request);
        AiRequestDto res = new AiRequestDto();
        res.setRequestId(saved.getRequestId());
        res.setFileName(saved.getFileName());
        res.setMemberId(saved.getMemberId());
        return res;
    }

    public void updateRequest(Long requestId, RequestUpdateDto dto) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new NoSuchElementException("의뢰를 찾을 수 없습니다."));

        request.setTitle(dto.getTitle());
        request.setInsuranceFaultRatio(dto.getInsuranceFaultRatio());
        request.setDescription(dto.getDescription());
        request.setQuestion(dto.getQuestion());
        request.setIsPublic(dto.getIsPublic());

        requestRepository.save(request);
    }

    public void deleteRequest(Long requestId) {
        if (!requestRepository.existsById(requestId)) {
            throw new NoSuchElementException("의뢰를 찾을 수 없습니다.");
        }
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
        Page<Request> requests = requestRepository.findAllByOrderByCreatedAtDesc(pageable);

        return requests.map(ReqeustListResDto::fromEntity);
    }
}
