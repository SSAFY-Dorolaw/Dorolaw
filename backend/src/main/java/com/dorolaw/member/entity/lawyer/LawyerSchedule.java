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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_id", nullable = false)
    private Member lawyer;

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
