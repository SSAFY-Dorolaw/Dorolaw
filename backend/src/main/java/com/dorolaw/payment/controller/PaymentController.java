package com.dorolaw.payment.controller;

import com.dorolaw.payment.dto.PaymentRequestDTO;
import com.dorolaw.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // 결제 준비 요청 (프론트엔드에서 결제 버튼 클릭 시 호출)
    @PostMapping("/ready")
    public String readyPayment(@RequestBody PaymentRequestDTO request) {
        return paymentService.requestPayment(request.getItemName(), request.getPrice());
    }

    // 결제 승인 (카카오에서 redirect URL로 호출한 경우)
    @GetMapping("/success")
    public String approvePayment(@RequestParam("pg_token") String pgToken, @RequestParam("tid") String tid) {
        return paymentService.approvePayment(tid, pgToken);
    }
}
