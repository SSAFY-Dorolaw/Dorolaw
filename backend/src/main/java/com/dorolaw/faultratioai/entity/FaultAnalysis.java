package com.dorolaw.faultratioai.entity;

import com.dorolaw.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "fault_analysis")
@Getter
@Setter
public class FaultAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Member member;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private boolean isPublic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum Status {
        PENDING, COMPLETED, CANCELED
    }

    @OneToOne(mappedBy = "faultAnalysis", fetch = FetchType.LAZY)
    private FaultAnalysisAIReports faultAnalysisAIReports;
}