package com.dorolaw.faultratioai.entity;

import com.dorolaw.request.entity.Request;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_reports")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class AiReport {

    @Id
    @Column(nullable = false)
    private Integer reportId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    @Column(nullable = false)
    private String fileName;

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;

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
