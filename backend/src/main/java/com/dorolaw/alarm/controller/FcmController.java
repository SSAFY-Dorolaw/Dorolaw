package com.dorolaw.alarm.controller;

import com.dorolaw.alarm.dto.request.FcmTokenDto;
import com.dorolaw.alarm.service.FcmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fcm-tokens")
@Slf4j
public class FcmController {
    private final FcmService fcmService;

    @PostMapping
    public String createFcmToken(@RequestBody FcmTokenDto fcmToken, @RequestHeader("Authorization") String authorizationHeader) {
        log.info("Registering token: " + fcmToken.getToken());
        fcmService.saveToken(fcmToken.getToken(), authorizationHeader);
        return "토큰 저장 완료";
    }
}
