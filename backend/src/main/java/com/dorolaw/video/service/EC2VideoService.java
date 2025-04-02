package com.dorolaw.video.service;

import com.dorolaw.video.dto.UploadResDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class EC2VideoService {

    @Value("${file.uploadDir}")
    private String uploadDir;

    public UploadResDto uploadVideo(MultipartFile file) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File dest = new File(dir, fileName);
        file.transferTo(dest);

        UploadResDto res = new UploadResDto();
        res.setFileName(fileName);

        return res;
    }

    public File getVideo(String fileName) {
        File file = new File(uploadDir, fileName);
        return file;
    }
}
