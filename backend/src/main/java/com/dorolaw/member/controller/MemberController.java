package com.dorolaw.member.controller;

import com.dorolaw.member.dto.common.MemberProfileDto;
import com.dorolaw.member.dto.request.MyPageUpdateRequestDto;
import com.dorolaw.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypage/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원 정보 조회 API (일반/변호사)
    @GetMapping("/profile")
    public ResponseEntity<Object> getProfile(@RequestHeader("Authorization") String authorizationHeader) {
        Object responseDto = memberService.getMemberInfo(authorizationHeader);
        return ResponseEntity.ok(responseDto);
    }

    // 회원 정보 수정 API (일반/변호사)
    @PutMapping("/profile")
    public ResponseEntity<Object> updateProfile(@RequestHeader("Authorization") String authorizationHeader,
                                                @RequestBody MyPageUpdateRequestDto requestDto) {
        Object updateProfileDto = memberService.updateMemberProfile(authorizationHeader, requestDto);
        return ResponseEntity.ok(updateProfileDto);
    }

    // 변호사 인증 API
    @PostMapping("/lawyer-verification")
    public ResponseEntity<?> verifyLawyer(@RequestHeader("Authorization") String authorization){
        memberService.verifyLawyer(authorization);
        return ResponseEntity.ok().build();
    }

}
