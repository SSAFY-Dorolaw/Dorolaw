package com.dorolaw.consultation.entity;

import com.dorolaw.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id", nullable = false)
    private Consultation consultation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_id", nullable = false)
    private Member lawyer;

    @Column(name = "lawyer_fee", nullable = false)
    private Integer lawyerFee;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus;

    @Column(name = "paid_date")
    private LocalDateTime paidDate;

    @PrePersist
    protected void onCreate() {
        paymentStatus = paymentStatus != null ? paymentStatus : PaymentStatus.UNPAID;
    }
}
