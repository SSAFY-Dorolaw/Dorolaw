package com.dorolaw.member.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberProfileDto {
    private Long memberId;
    private String name;
    private String email;
    private String phoneNumber;
    private String joinDate;
    private String profileImage;
    private String role;

    public GeneralProfileDto toGeneralProfile() {
        return GeneralProfileDto.builder()
                .clientId(memberId)
                .name(name)
                .email(email)
                .phoneNumber(phoneNumber)
                .joinDate(joinDate)
                .profileImage(profileImage)
                .build();
    }

    public LawyerProfileDto toLawyerProfile(LawyerProfileDto lawyerInfo) {
        lawyerInfo.setLawyerId(memberId);
        lawyerInfo.setName(name);
        lawyerInfo.setEmail(email);
        lawyerInfo.setPhoneNumber(phoneNumber);
        lawyerInfo.setProfileImage(profileImage);
        return lawyerInfo;
    }
}
