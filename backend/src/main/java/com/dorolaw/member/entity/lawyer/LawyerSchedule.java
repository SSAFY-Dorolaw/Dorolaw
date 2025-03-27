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
    @Column(name = "schedule_id")
    private Long scheduleId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyer;

    @Column(name = "monday_start_time")
    private LocalTime mondayStartTime;

    @Column(name = "monday_end_time")
    private LocalTime mondayEndTime;

    @Column(name = "tuesday_start_time")
    private LocalTime tuesdayStartTime;

    @Column(name = "tuesday_end_time")
    private LocalTime tuesdayEndTime;

    @Column(name = "wednesday_start_time")
    private LocalTime wednesdayStartTime;

    @Column(name = "wednesday_end_time")
    private LocalTime wednesdayEndTime;

    @Column(name = "thursday_start_time")
    private LocalTime thursdayStartTime;

    @Column(name = "thursday_end_time")
    private LocalTime thursdayEndTime;

    @Column(name = "friday_start_time")
    private LocalTime fridayStartTime;

    @Column(name = "friday_end_time")
    private LocalTime fridayEndTime;

    @Column(name = "saturday_start_time")
    private LocalTime saturdayStartTime;

    @Column(name = "saturday_end_time")
    private LocalTime saturdayEndTime;

    @Column(name = "sunday_start_time")
    private LocalTime sundayStartTime;

    @Column(name = "sunday_end_time")
    private LocalTime sundayEndTime;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
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
