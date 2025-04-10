package com.dorolaw.member.controller;

import com.dorolaw.member.dto.request.LawyerBusinessHourRequestDto;
import com.dorolaw.member.dto.request.MyPageUpdateRequestDto;
import com.dorolaw.member.dto.request.VerifyLawyerRequestDto;
import com.dorolaw.member.dto.response.MemberClaimsResponseDto;
import com.dorolaw.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
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
    @PatchMapping("/profile")
    public ResponseEntity<Object> updateProfile(@RequestHeader("Authorization") String authorizationHeader,
                                                @RequestBody MyPageUpdateRequestDto requestDto) {
        Object updateProfileDto = memberService.updateMemberProfile(authorizationHeader, requestDto);
        return ResponseEntity.ok(updateProfileDto);
    }

    // 변호사 인증 API
    @PostMapping("/lawyer-verification")
    public ResponseEntity<?> verifyLawyer(@RequestBody VerifyLawyerRequestDto request){
        memberService.verifyLawyer(request);
        return ResponseEntity.ok().build();
    }

    // 변호사 운영 시간 설정 API
    @PostMapping("/business-hours")
    public ResponseEntity<Void> setAvailableTimes(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody LawyerBusinessHourRequestDto request) {
        memberService.setLawyerBusinessTimes(authorizationHeader, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/claims")
    public ResponseEntity<MemberClaimsResponseDto> getMemberClaims(@RequestHeader("Authorization") String authorizationHeader) {
        MemberClaimsResponseDto response = memberService.getMemberClaims(authorizationHeader);
        return ResponseEntity.ok(response);
    }


}
