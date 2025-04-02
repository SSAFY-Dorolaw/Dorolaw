package com.dorolaw.faultratioai.entity;

import com.dorolaw.request.entity.Request;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "fault_analysis_ai_reports")
@Getter
@Setter
public class FaultAnalysisAIReports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long reportId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private String AccidentObject;

    @Column(nullable = false)
    private String AccidentLocation;

    @Column(nullable = false)
    private String AccidentLocationCharacteristics;

    @Column(nullable = false)
    private String DirectionOfA;

    @Column(nullable = false)
    private String DirectionOfB;

    @Column(nullable = false)
    private Integer FaultRatioA;

    @Column(nullable = false)
    private Integer FaultRatioB;

    @Column(nullable = false)
    private Integer AccidentType;
}