package com.dorolaw.member.entity.lawyer;


import com.dorolaw.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lawyer_profile")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LawyerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lawyer_profile_id")
    private Long lawyerProfileId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "lawyerProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LawyerCareer> careers = new ArrayList<>();

    @OneToMany(mappedBy = "lawyerProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LawyerEducation> educations = new ArrayList<>();

    @Column(name= "office_name", length = 100, nullable = false)
    private String officeName;

    @Column(name = "office_phone_number", length = 20, nullable = false)
    private String officePhoneNumber;

    @Column(name = "office_address", length = 255, nullable = false)
    private String officeAddress;

    @Column(name = "region", length = 50)
    private String region;

    @Column(name = "attorney_license_number", length = 50, nullable = false)
    private String attorneyLicenseNumber;

    @Column(name = "qualification_exam", length = 100)
    private String qualificationExam;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "specialties", length = 20)
    private String specialties;

    @Column(name = "short_introduction", length = 255)
    private String shortIntroduction;

    @Column(name = "greeting", length = 100)
    private String greeting;

    @Column(name = "introduction_video_url")
    private String introductionVideoUrl;

    @Column(name = "graduation_certificate")
    private String graduationCertificate;


    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified;

    @Column(name = "verification_date")
    private LocalDateTime verificationDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "account_number", nullable = false)
    private Long accountNumber;

    @Column(name = "bank_name", length = 20, nullable = false)
    private String bankName;

    @OneToMany(mappedBy = "lawyerProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LawyerAccidentInterest> interests = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isVerified == null) {
            isVerified = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void verifiedLawyer(){
        this.isVerified = true;
        this.verificationDate = LocalDateTime.now();
    }

    public void updateProfile(String officeName, String officePhoneNumber, String officeAddress,
                              String gender, String specialties, String shortIntroduction,
                              String greeting, String introductionVideoUrl, Long accountNumber,
                              String bankName) {
        this.officeName = officeName;
        this.officePhoneNumber = officePhoneNumber;
        this.officeAddress = officeAddress;
        this.gender = gender;
        this.specialties = specialties;
        this.shortIntroduction = shortIntroduction;
        this.greeting = greeting;
        this.introductionVideoUrl = introductionVideoUrl;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.updatedAt = LocalDateTime.now();
    }

}
