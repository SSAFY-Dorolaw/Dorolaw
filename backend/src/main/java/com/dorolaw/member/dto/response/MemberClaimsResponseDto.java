package com.dorolaw.member.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberClaimsResponseDto {
    private Long memberId;
    private String role;
    private Long lawyerId;

    // 일반 사용자용 생성자
    public MemberClaimsResponseDto(Long memberId, String role) {
        this.memberId = memberId;
        this.role = role;
        this.lawyerId = null; // 일반 사용자는 lawyerId가 없음
    }
}