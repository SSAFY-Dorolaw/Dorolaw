package com.dorolaw.member.entity.lawyer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lawyer_education")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LawyerEducation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lawyer_education_id")
    private Long lawyerEducationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyerProfile;

    @Column(name = "school", length = 100)
    private String school;

    @Column(name = "degree", length = 100)
    private String degree;

    @Column(name = "graduation_year")
    private Integer graduationYear;
}
