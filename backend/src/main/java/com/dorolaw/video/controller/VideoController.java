package com.dorolaw.video.controller;

import com.dorolaw.video.dto.UploadResDto;
import com.dorolaw.video.service.EC2VideoService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Controller
@RequestMapping("/api/videos")
public class VideoController {

    private EC2VideoService ec2VideoService;

    public VideoController(EC2VideoService ec2VideoService) {
        this.ec2VideoService = ec2VideoService;
    }

    @GetMapping("/test")
    public String uploadPage() {
        return "upload";
    }

    // 업로드
    @PostMapping("/upload")
    public ResponseEntity<UploadResDto> uploadVideo(@RequestParam("file") MultipartFile file) throws IOException {
        UploadResDto res = ec2VideoService.uploadVideo(file);
        return ResponseEntity.ok(res);
    }

    // 다운로드 (브라우저 재생 가능)
    @GetMapping("/{fileName}")
    public void getVideo(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        File file = ec2VideoService.getVideo(fileName);
        if (!file.exists()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        // Content-Type을 video/mp4 등으로 설정
        String contentType = Files.probeContentType(file.toPath());
        response.setContentType(contentType != null ? contentType : "application/octet-stream");

        response.setHeader("Content-Disposition", "inline; filename=\"" + fileName + "\"");
        Files.copy(file.toPath(), response.getOutputStream());
        response.flushBuffer();
    }
}
