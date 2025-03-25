package com.dorolaw.member.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LawyerProfileDto {
    private Long lawyerId;
    private String name;
    private String email;
    private String phoneNumber;
    private String profileImage;
    private String officeName;
    private String officePhoneNumber;
    private String officeAddress;
    private String gender;
    private String specialties;
    private String oneLineIntro;
    private String greetingMessage;
    private Long reviewCount;
    private Float averageRating;
    private String introVideo;
    private List<EducationDto> education;
    private List<CareerDto> career;
    private String lawyerLicenseNumber;
    private String lawyerLicenseExam;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EducationDto {
        private String school;
        private String degree;
        private Integer graduationYear;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CareerDto {
        private String company;
        private String position;
        private String years;
    }
}
