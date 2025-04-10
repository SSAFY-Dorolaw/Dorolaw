package com.dorolaw.member.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.A;

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
    private String oneLineIntro;
    private String greetingMessage;
    private Long reviewCount;
    private Float averageRating;
    private String introVideo;
    private String accountNumber;
    private String bankName;
    private List<EducationDto> educations;
    private List<CareerDto> careers;
    private String lawyerLicenseNumber;
    private String lawyerLicenseExam;
    private List<LawyerTagDto> lawyerTags;

    private Long completedConsultationCount;
    private List<TodayConsultationDto> todayConsultations;
    private Integer phoneConsultationPrice;
    private Integer videoConsultationPrice;
    private Integer visitConsultationPrice;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TodayConsultationDto {
        private String scheduledTime;
        private String clientName;
        private String consultationType;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LawyerTagDto{
        private String lawyer_specialties;
        private String description;
    }

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
