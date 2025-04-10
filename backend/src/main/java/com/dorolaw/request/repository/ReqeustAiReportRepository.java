package com.dorolaw.request.repository;

import com.dorolaw.request.entity.AiReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReqeustAiReportRepository extends JpaRepository<AiReport, Long> {
    @Query("SELECT ar FROM AiReport ar " +
            "WHERE ar.request.member.memberId = :memberId " +
            "ORDER BY ar.createdAt DESC")
    List<AiReport> findAllByMemberId(@Param("memberId") Long memberId);
}
