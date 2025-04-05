package com.dorolaw.faultanalysis.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Entity
@Table(name = "fault_analysis")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class FaultAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long faultAnalysisId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private Boolean isPublic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FaultAnalysisStatus status;

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "faultAnalysis", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private FaultAnalysisAIReport faultAnalysisAIReports;
}