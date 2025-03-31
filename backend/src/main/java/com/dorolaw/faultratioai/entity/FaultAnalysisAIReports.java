package com.dorolaw.faultratioai.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "fault_analysis_ai_reports")
@Getter
@Setter
public class FaultAnalysisAIReports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(nullable = false)
    private FaultAnalysis faultAnalysis;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(nullable = false)
    private Integer accidentalNegligenceRateA;

    @Column(nullable = false)
    private Integer accidentalNegligenceRateB;

    @Column(nullable = false)
    private Integer accidentPlace;

    @Column(nullable = false)
    private Integer accidentPlaceFeature;

    @Column(nullable = false)
    private Integer vehicleAProgressInfo;

    @Column(nullable = false)
    private Integer vehicleBProgressInfo;
}