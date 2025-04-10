package com.dorolaw.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum BaseResponseStatus {

    /**
     * 200: 요청 성공
     **/
    SUCCESS(HttpStatus.OK, true, 200, "요청에 성공하였습니다."),

    /**
     * 900: 기타 에러
     */
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, false, 900, "Internal server error"),


    /**
     * 1000: user 관련 에러
     */
    FAILED_TO_LOGIN(HttpStatus.UNAUTHORIZED, false, 1000, "아이디 또는 패스워드를 다시 확인하세요."),

    /**
     * 2000: TEAM 관련
     */

    USER_ALREADY_IN_TEAM(HttpStatus.BAD_REQUEST, false, 2000, "사용자는 이미 해당 팀에 속해 있습니다.");

    private final HttpStatusCode httpStatusCode;
    private final boolean isSuccess;
    private final int code;
    private final String message;

}
