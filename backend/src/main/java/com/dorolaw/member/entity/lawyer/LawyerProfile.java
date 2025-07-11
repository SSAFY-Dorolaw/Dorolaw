package com.dorolaw.member.entity.lawyer;

import com.dorolaw.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lawyer_profile")
@EntityListeners(AuditingEntityListener.class)
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

    @OneToMany(mappedBy = "lawyerProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LawyerSchedule> schedules = new ArrayList<>();

    @Column(name= "office_name", length = 100, nullable = false)
    private String officeName;

    @Column(name = "office_phone_number", length = 20, nullable = false)
    private String officePhoneNumber;

    // 광역시,도
    @Column(name = "office_province", length = 50, nullable = false)
    private String officeProvince;

    // 시군구
    @Column(name = "office_city_district", length = 50, nullable = false)
    private String officeCityDistrict;

    // 기타 상세 주소
    @Column(name = "office_detailed_address", nullable = false)
    private String officeDetailedAddress;

    @Column(name = "region", length = 50)
    private String region;

    @Column(name = "attorney_license_number", length = 50, nullable = false)
    private String attorneyLicenseNumber;

    @Column(name = "qualification_exam", length = 100)
    private String qualificationExam;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "short_introduction")
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

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;

    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @Column(name = "bank_name", length = 20, nullable = false)
    private String bankName;

    @Column(name = "phone_consultation_price")
    private Integer phoneConsultationPrice;

    @Column(name = "video_consultation_price")
    private Integer videoConsultationPrice;

    @Column(name = "visit_consultation_price")
    private Integer visitConsultationPrice;

    public void verifiedLawyer(){
        this.isVerified = true;
        this.verificationDate = LocalDateTime.now();
    }

    public void updateProfile(
            String officeName,
            String officePhoneNumber,
            String officeProvince,
            String officeCityDistrict,
            String officeDetailedAddress,
            String gender,
            String shortIntroduction,
            String greeting,
            String introductionVideoUrl,
            String accountNumber,
            String bankName,
            Integer phoneConsultationPrice,
            Integer videoConsultationPrice,
            Integer visitConsultationPrice,
            String attorneyLicenseNumber,
            String qualificationExam
    ) {
        this.officeName = officeName;
        this.officePhoneNumber = officePhoneNumber;
        this.officeProvince = officeProvince;
        this.officeCityDistrict = officeCityDistrict;
        this.officeDetailedAddress = officeDetailedAddress;
        this.gender = gender;
        this.shortIntroduction = shortIntroduction;
        this.greeting = greeting;
        this.introductionVideoUrl = introductionVideoUrl;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.phoneConsultationPrice = phoneConsultationPrice;
        this.videoConsultationPrice = videoConsultationPrice;
        this.visitConsultationPrice = visitConsultationPrice;
        this.attorneyLicenseNumber = attorneyLicenseNumber;
        this.qualificationExam = qualificationExam;
    }

    public void parseAndSetAddress(String fullAddress) {
        String[] parts = fullAddress.trim().split(" ", 3);
        if (parts.length >= 3) {
            this.officeProvince = parts[0];
            this.officeCityDistrict = parts[1];
            this.officeDetailedAddress = parts[2];
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    public String getFullOfficeAddress() {
        return officeProvince + " " + officeCityDistrict + " " + officeDetailedAddress;
    }

}
