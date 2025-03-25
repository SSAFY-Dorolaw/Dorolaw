package com.dorolaw.member.repository;

import com.dorolaw.member.entity.lawyer.LawyerAccidentInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LawyerAccidentInterestRepository extends JpaRepository<LawyerAccidentInterest, Integer> {
    void deleteByLawyerProfile_LawyerProfileId(Long lawyerProfileId);
}
