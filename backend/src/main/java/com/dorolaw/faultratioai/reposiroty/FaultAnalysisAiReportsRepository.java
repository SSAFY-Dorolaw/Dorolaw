package com.dorolaw.faultratioai.reposiroty;

import com.dorolaw.faultratioai.entity.FaultAnalysis;
import com.dorolaw.faultratioai.entity.FaultAnalysisAIReports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FaultAnalysisAiReportsRepository extends JpaRepository<FaultAnalysisAIReports, Long> {
    @Query("SELECT ar FROM FaultAnalysisAIReports ar " +
            "WHERE ar.faultAnalysis.memberId = :memberId " +
            "ORDER BY ar.createdAt DESC")
    List<FaultAnalysisAIReports> findAllByMemberId(@Param("memberId") Long memberId);

    Optional<FaultAnalysisAIReports> findByFaultAnalysis(FaultAnalysis faultAnalysis);
}