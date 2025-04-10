package com.dorolaw.consultation.entity;

import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.request.entity.Request;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "consultations")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultation_id")
    private Long consultationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "memberId", nullable = false)
    private Member client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", referencedColumnName = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyer;

    @OneToOne(mappedBy = "consultation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Review review;

    @Column(name = "consultation_date", nullable = false)
    private LocalDate consultationDate;

    @Column(name = "scheduled_time", nullable = false)
    private LocalTime scheduledTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "consultation_type", nullable = false)
    private ConsultationType consultationType;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "additional_question")
    private String additionalQuestion;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ConsultationStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        status = status != null ? status : ConsultationStatus.SCHEDULED;
    }
}
