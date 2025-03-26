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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_id", nullable = false)
    private Member lawyer;

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
            LocalTime mondayStartTime, LocalTime mondayEndTime,
            LocalTime tuesdayStartTime, LocalTime tuesdayEndTime,
            LocalTime wednesdayStartTime, LocalTime wednesdayEndTime,
            LocalTime thursdayStartTime, LocalTime thursdayEndTime,
            LocalTime fridayStartTime, LocalTime fridayEndTime,
            LocalTime saturdayStartTime, LocalTime saturdayEndTime,
            LocalTime sundayStartTime, LocalTime sundayEndTime) {

        this.mondayStartTime = mondayStartTime;
        this.mondayEndTime = mondayEndTime;
        this.tuesdayStartTime = tuesdayStartTime;
        this.tuesdayEndTime = tuesdayEndTime;
        this.wednesdayStartTime = wednesdayStartTime;
        this.wednesdayEndTime = wednesdayEndTime;
        this.thursdayStartTime = thursdayStartTime;
        this.thursdayEndTime = thursdayEndTime;
        this.fridayStartTime = fridayStartTime;
        this.fridayEndTime = fridayEndTime;
        this.saturdayStartTime = saturdayStartTime;
        this.saturdayEndTime = saturdayEndTime;
        this.sundayStartTime = sundayStartTime;
        this.sundayEndTime = sundayEndTime;
    }
}
