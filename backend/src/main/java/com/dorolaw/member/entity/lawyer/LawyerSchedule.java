package com.dorolaw.member.entity.lawyer;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

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

    private LocalTime mondayStartTime;
    private LocalTime mondayEndTime;

    private LocalTime tuesdayStartTime;
    private LocalTime tuesdayEndTime;

    private LocalTime wednesdayStartTime;
    private LocalTime wednesdayEndTime;

    private LocalTime thursdayStartTime;
    private LocalTime thursdayEndTime;

    private LocalTime fridayStartTime;
    private LocalTime fridayEndTime;

    private LocalTime saturdayStartTime;
    private LocalTime saturdayEndTime;

    private LocalTime sundayStartTime;
    private LocalTime sundayEndTime;

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
        // null 체크하고 LocalTime으로 변환
        this.mondayStartTime = mondayStartTime != null ? LocalTime.parse(mondayStartTime) : null;
        this.mondayEndTime = mondayEndTime != null ? LocalTime.parse(mondayEndTime) : null;
        this.tuesdayStartTime = tuesdayStartTime != null ? LocalTime.parse(tuesdayStartTime) : null;
        this.tuesdayEndTime = tuesdayEndTime != null ? LocalTime.parse(tuesdayEndTime) : null;
        this.wednesdayStartTime = wednesdayStartTime != null ? LocalTime.parse(wednesdayStartTime) : null;
        this.wednesdayEndTime = wednesdayEndTime != null ? LocalTime.parse(wednesdayEndTime) : null;
        this.thursdayStartTime = thursdayStartTime != null ? LocalTime.parse(thursdayStartTime) : null;
        this.thursdayEndTime = thursdayEndTime != null ? LocalTime.parse(thursdayEndTime) : null;
        this.fridayStartTime = fridayStartTime != null ? LocalTime.parse(fridayStartTime) : null;
        this.fridayEndTime = fridayEndTime != null ? LocalTime.parse(fridayEndTime) : null;
        this.saturdayStartTime = saturdayStartTime != null ? LocalTime.parse(saturdayStartTime) : null;
        this.saturdayEndTime = saturdayEndTime != null ? LocalTime.parse(saturdayEndTime) : null;
        this.sundayStartTime = sundayStartTime != null ? LocalTime.parse(sundayStartTime) : null;
        this.sundayEndTime = sundayEndTime != null ? LocalTime.parse(sundayEndTime) : null;
    }
}
