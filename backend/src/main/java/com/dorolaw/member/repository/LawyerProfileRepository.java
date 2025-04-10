package com.dorolaw.member.repository;

import com.dorolaw.member.entity.lawyer.LawyerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LawyerProfileRepository extends JpaRepository<LawyerProfile, Long> {
    Optional<LawyerProfile> findByMember_MemberId(Long memberId);
}
