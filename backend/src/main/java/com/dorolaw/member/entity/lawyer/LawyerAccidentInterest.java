package com.dorolaw.member.entity.lawyer;

import com.dorolaw.member.entity.lawyer.LawyerProfile;
import com.dorolaw.request.entity.AccidentType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lawyer_accident_interest")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class LawyerAccidentInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_id")
    private Integer interestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_profile_id", nullable = false)
    private LawyerProfile lawyerProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accident_type_id", nullable = false)
    private AccidentType accidentType;
}
