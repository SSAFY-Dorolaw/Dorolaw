package com.dorolaw.member.entity.lawyer;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lawyer_career")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LawyerCareer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lawyer_career_id")
    private Long lawyerCareerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyerProfile;

    @Column(name = "company", length = 100)
    private String company;

    @Column(name = "position", length = 100)
    private String position;

    @Column(name = "years", length = 50)
    private String years;

}