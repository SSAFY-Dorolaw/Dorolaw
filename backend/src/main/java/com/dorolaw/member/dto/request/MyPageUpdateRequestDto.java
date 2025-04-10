package com.dorolaw.member.dto.request;

import com.dorolaw.member.entity.lawyer.LawyerSpeciality;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPageUpdateRequestDto {

    // 공통
    private String phoneNumber;
    private String profileImage;

    // 변호사
    private String officeName;
    private String officePhoneNumber;
    private String officeAddress;
    private String gender;
    private List<LawyerSpeciality> specialties;
    private String oneLineIntro;
    private String greetingMessage;
    private String introVideo;
    private String accountNumber;
    private String bankName;
    private String lawyerLicenseNumber;
    private String lawyerLicenseExam;
    private List<EducationUpdateDto> educations;
    private List<CareerUpdateDto> careers;
    private Integer phoneConsultationPrice;
    private Integer videoConsultationPrice;
    private Integer visitConsultationPrice;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EducationUpdateDto {
        private String school;
        private String degree;
        private Integer graduationYear;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CareerUpdateDto {
        private String company;
        private String position;
        private String years;
    }
}