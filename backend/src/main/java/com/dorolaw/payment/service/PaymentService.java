package com.dorolaw.payment.service;

import com.dorolaw.payment.dto.KakaoReadyResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentService {

    @Value("${kakao.adminKey}")
    private String adminKey;

    @Value("${kakao.readyUrl}")
    private String kakaoReadyUrl;

    @Value("${kakao.approveUrl}")
    private String kakaoApproveUrl;

    @Value("${kakao.redirectUrl}")
    private String redirectUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String requestPayment(String itemName, int price) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME"); // 테스트용 CID
        params.add("partner_order_id", "order1234");
        params.add("partner_user_id", "user123");
        params.add("item_name", itemName);
        params.add("quantity", "1");
        params.add("total_amount", String.valueOf(price));
        params.add("vat_amount", "0");
        params.add("tax_free_amount", "0");

        // 리다이렉트 URL을 지정 (카카오 Developers에 등록된 도메인과 일치해야 함)
        params.add("approval_url", redirectUrl + "/kakaoPaySuccess");
        params.add("cancel_url", redirectUrl + "/kakaoPayCancel");
        params.add("fail_url", redirectUrl + "/kakaoPayFail");

        HttpHeaders headers = new HttpHeaders();
        // REST API 키를 "KakaoAK " 접두어와 함께 전달해야 합니다.
        headers.add("Authorization", "KakaoAK " + adminKey);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(kakaoReadyUrl, requestEntity, String.class);

        try {
            KakaoReadyResponse readyResponse = objectMapper.readValue(response.getBody(), KakaoReadyResponse.class);
            System.out.println("TID: " + readyResponse.getTid());
            // 적절한 결제 페이지 URL 선택 (PC, 모바일, 앱 중)
            return readyResponse.getNextRedirectPcUrl();
        } catch (Exception e) {
            throw new RuntimeException("결제 준비 요청 파싱 실패");
        }
    }

    public String approvePayment(String tid, String pgToken) {
        // 결제 승인 요청 파라미터 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", tid);
        params.add("partner_order_id", "order1234");
        params.add("partner_user_id", "user123");
        params.add("pg_token", pgToken);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + adminKey);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(kakaoApproveUrl, request, String.class);
        System.out.println(response.getBody());

        return response.getBody();
    }
}