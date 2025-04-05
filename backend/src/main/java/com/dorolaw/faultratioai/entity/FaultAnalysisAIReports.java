package com.dorolaw.faultratioai.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Entity
@Table(name = "fault_analysis_ai_reports")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class FaultAnalysisAIReports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long reportId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private FaultAnalysis faultAnalysis;

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private String accidentObject;

    @Column(nullable = false)
    private String accidentLocation;

    @Column(nullable = false)
    private String accidentLocationCharacteristics;

    @Column(nullable = false)
    private String directionOfA;

    @Column(nullable = false)
    private String directionOfB;

    @Column(nullable = false)
    private Integer faultRatioA;

    @Column(nullable = false)
    private Integer faultRatioB;

    @Column(nullable = false)
    private Integer accidentType;
}