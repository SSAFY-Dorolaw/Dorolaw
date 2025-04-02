package com.dorolaw.member.repository;

import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LawyerTagRepository extends JpaRepository<LawyerTag, Long> {
    List<LawyerTag> findByLawyerId(Member lawyer);
    void deleteByLawyerId(Member lawyer);
}