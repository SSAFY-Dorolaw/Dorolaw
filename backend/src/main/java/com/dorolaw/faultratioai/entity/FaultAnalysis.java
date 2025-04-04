package com.dorolaw.faultratioai.entity;

import com.dorolaw.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "fault_analysis")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaultAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long faultAnalysisId;

    @OneToOne(mappedBy = "faultAnalysis", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private FaultAnalysisAIReports faultAnalysisAIReports;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private boolean isPublic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum Status {
        PENDING, COMPLETED, CANCELED
    }

    public void assignMemberId(Long memberId) {
        this.memberId = memberId;
    }
    public void updateFileName(String fileName) {
        this.fileName = fileName;
    }

    public void makePublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void changeTitle(String title) {
        this.title = title;
    }

    public void changePublicStatus(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void updateModificationTime() {
        this.updatedAt = LocalDateTime.now();
    }
}