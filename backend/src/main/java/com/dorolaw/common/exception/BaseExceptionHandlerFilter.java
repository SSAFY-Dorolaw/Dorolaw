package com.dorolaw.common.exception;

import com.dorolaw.common.response.BaseResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class BaseExceptionHandlerFilter extends OncePerRequestFilter {

    /**
     * filter단에서 발생하는 에러는, 서블릿이 실행되기 전에 발생하므로 controller에서 잡지 못한다.
     * 따라서 Error를 처리할 filter를 만들어서 사용함.
     * OncePerRequestFilter: Filter 중복 호출을 방지하고 클래스 이름 그대로 하나의 Request에 한 번만 호출되도록 하는 필터
     */


    // Filter단에서 발생하는 exception을 처리하는 필터
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        }
        catch (BaseException e) {
            setErrorResponse(response, e);
        }
    }

    // Error를 Json으로 바꿔서 클라이언트에 전달
    private void setErrorResponse(HttpServletResponse response,
                                  BaseException be) {
        // 직렬화 하기위한 object mapper
        ObjectMapper objectMapper = new ObjectMapper();
        // response의 contentType, 인코딩, 응답값을 정함
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        BaseResponse baseResponse = new BaseResponse(be.getStatus());
        // BaseResponse를 return 하도록 설정
        try {
            response.getWriter().write(objectMapper.writeValueAsString(baseResponse));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

