package com.dorolaw.common.exception;

import com.dorolaw.common.response.BaseResponse;
import com.dorolaw.common.response.BaseResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class BaseExceptionHandler {

    /**
     * 발생한 예외 처리
     */

    // 등록된 에러
    @ExceptionHandler(BaseException.class)
    protected ResponseEntity<BaseResponse<Void>> BaseError(BaseException e) {
        // BaseException의 BaseResponseStatus를 가져와서 BaseResponse를 만들어서 return해줌
        BaseResponse<Void> response = new BaseResponse<>(e.getStatus());
        log.error("BaseException: ", e);
        return new ResponseEntity<>(response, response.httpStatus());
    }


    // 런타임 에러
    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<BaseResponse<Void>> RuntimeError(RuntimeException e) {
        // BaseException으로 잡히지 않는 RuntimeError는, INTERNAL_SEBVER_ERROR로 처리해줌
        BaseResponse<Void> response = new BaseResponse<>(BaseResponseStatus.INTERNAL_SERVER_ERROR);
        log.error("RuntimeException: ", e);
        for (StackTraceElement s : e.getStackTrace()) {
            System.out.println(s);
        }
        return new ResponseEntity<>(response, response.httpStatus());
    }

}
