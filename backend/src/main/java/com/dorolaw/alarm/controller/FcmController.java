package com.dorolaw.alarm.controller;

import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.alarm.service.FcmService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fcm-tokens")
@Slf4j
public class FcmController {
    private final FcmService fcmService;

    public FcmController(FcmService fcmService) {
        this.fcmService = fcmService;
    }

    @PostMapping
    public String registerToken(@RequestBody FcmToken token, @RequestHeader("Authorization") String authorizationHeader) {
        log.info("Registering token: " + token);
        fcmService.saveToken(token.getToken(), authorizationHeader);
        return "토큰 저장 완료";
    }
}
