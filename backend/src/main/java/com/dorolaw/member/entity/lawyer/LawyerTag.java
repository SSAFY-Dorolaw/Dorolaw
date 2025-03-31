package com.dorolaw.member.entity.lawyer;

import com.dorolaw.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lawyer_tags")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LawyerTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lawyer_tag_id", nullable = false)
    private Long lawyerTagId;

    @Enumerated(EnumType.STRING)
    @Column(name = "lawyer_specialities", nullable = false)
    private LawyerSpeciality lawyerSpeciality;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_id", nullable = false)
    private Member lawyerId;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updatedAt = LocalDateTime.now();

}