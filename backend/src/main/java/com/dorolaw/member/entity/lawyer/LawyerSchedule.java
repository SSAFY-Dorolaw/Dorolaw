package com.dorolaw.member.entity.lawyer;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lawyer_schedule")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LawyerSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyerProfile;

    private String mondayStartTime;
    private String mondayEndTime;

    private String tuesdayStartTime;
    private String tuesdayEndTime;

    private String wednesdayStartTime;
    private String wednesdayEndTime;

    private String thursdayStartTime;
    private String thursdayEndTime;

    private String fridayStartTime;
    private String fridayEndTime;

    private String saturdayStartTime;
    private String saturdayEndTime;

    private String sundayStartTime;
    private String sundayEndTime;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void updateSchedule(
            String mondayStartTime, String mondayEndTime,
            String tuesdayStartTime, String tuesdayEndTime,
            String wednesdayStartTime, String wednesdayEndTime,
            String thursdayStartTime, String thursdayEndTime,
            String fridayStartTime, String fridayEndTime,
            String saturdayStartTime, String saturdayEndTime,
            String sundayStartTime, String sundayEndTime
    ) {
        this.mondayStartTime = mondayStartTime != null ? mondayStartTime : "closed";
        this.mondayEndTime = mondayEndTime != null ? mondayEndTime : "closed";
        this.tuesdayStartTime = tuesdayStartTime != null ? tuesdayStartTime : "closed";
        this.tuesdayEndTime = tuesdayEndTime != null ? tuesdayEndTime : "closed";
        this.wednesdayStartTime = wednesdayStartTime != null ? wednesdayStartTime : "closed";
        this.wednesdayEndTime = wednesdayEndTime != null ? wednesdayEndTime : "closed";
        this.thursdayStartTime = thursdayStartTime != null ? thursdayStartTime : "closed";
        this.thursdayEndTime = thursdayEndTime != null ? thursdayEndTime : "closed";
        this.fridayStartTime = fridayStartTime != null ? fridayStartTime : "closed";
        this.fridayEndTime = fridayEndTime != null ? fridayEndTime : "closed";
        this.saturdayStartTime = saturdayStartTime != null ? saturdayStartTime : "closed";
        this.saturdayEndTime = saturdayEndTime != null ? saturdayEndTime : "closed";
        this.sundayStartTime = sundayStartTime != null ? sundayStartTime : "closed";
        this.sundayEndTime = sundayEndTime != null ? sundayEndTime : "closed";
    }
}
