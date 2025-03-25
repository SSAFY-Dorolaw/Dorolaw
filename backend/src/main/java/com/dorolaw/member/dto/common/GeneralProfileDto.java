package com.dorolaw.member.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeneralProfileDto {
    private Long clientId;
    private String name;
    private String email;
    private String phoneNumber;
    private String joinDate;
    private String profileImage;
}
