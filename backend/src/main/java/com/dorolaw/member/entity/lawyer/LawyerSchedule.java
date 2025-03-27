package com.dorolaw.member.entity.lawyer;

import com.dorolaw.member.entity.Member;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyer;

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
        this.mondayStartTime = parseTime(mondayStartTime);
        this.mondayEndTime = parseTime(mondayEndTime);
        this.tuesdayStartTime = parseTime(tuesdayStartTime);
        this.tuesdayEndTime = parseTime(tuesdayEndTime);
        this.wednesdayStartTime = parseTime(wednesdayStartTime);
        this.wednesdayEndTime = parseTime(wednesdayEndTime);
        this.thursdayStartTime = parseTime(thursdayStartTime);
        this.thursdayEndTime = parseTime(thursdayEndTime);
        this.fridayStartTime = parseTime(fridayStartTime);
        this.fridayEndTime = parseTime(fridayEndTime);
        this.saturdayStartTime = parseTime(saturdayStartTime);
        this.saturdayEndTime = parseTime(saturdayEndTime);
        this.sundayStartTime = parseTime(sundayStartTime);
        this.sundayEndTime = parseTime(sundayEndTime);
    }

    private LocalTime parseTime(String time) {
        return time != null ? LocalTime.parse(time) : null;
    }
}
