package com.dorolaw.request.entity;

import com.dorolaw.faultratioai.entity.AiReport;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "requests")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @Column(nullable = false)
    private Long memberId;

    private String title;

    @Column(nullable = false)
    private String fileName;

    private String insuranceFaultRatio;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(nullable = false)
    private Boolean isPublic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "request", fetch = FetchType.LAZY)
    private AiReport aiReport;

    @OneToMany(mappedBy = "request", fetch = FetchType.LAZY)
    private List<Answer> answers;
}
