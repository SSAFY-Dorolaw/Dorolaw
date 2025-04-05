package com.dorolaw.request.service;

import com.dorolaw.request.dto.request.AnswerCreateDto;
import com.dorolaw.request.dto.request.AnswerUpdateDto;
import com.dorolaw.request.entity.Answer;
import com.dorolaw.request.entity.Request;
import com.dorolaw.request.repository.AnswerRepository;
import com.dorolaw.request.repository.RequestRepository;
import com.dorolaw.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final RequestRepository requestRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public void createAnswer(String authorizationHeader, AnswerCreateDto dto) {
        String token = jwtTokenProvider.extractToken(authorizationHeader);
        Long memberId = Long.valueOf(jwtTokenProvider.getMemberIdFromJWT(token));

        // getReferenceById를 사용해 프록시 객체를 받아옴 (실제 조회 없이 requestId만 설정)
        Request request = requestRepository.getReferenceById(dto.getRequestId());

        Answer answer = new Answer();
        answer.setRequest(request);
        answer.setLawyerId(memberId);
        answer.setContent(dto.getContent());
        answer.setIsSelected(false);  // 기본값

        answerRepository.save(answer);
    }

    public void updateAnswer(Long answerId, AnswerUpdateDto dto) {
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new NoSuchElementException("답변을 찾을 수 없습니다."));

        answer.setContent(dto.getContent());
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long answerId) {
        if (!answerRepository.existsById(answerId)) {
            throw new NoSuchElementException("답변을 찾을 수 없습니다.");
        }
        answerRepository.deleteById(answerId);
    }
}
