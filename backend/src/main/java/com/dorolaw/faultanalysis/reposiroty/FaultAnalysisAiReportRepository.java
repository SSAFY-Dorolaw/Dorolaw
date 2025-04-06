package com.dorolaw.faultanalysis.reposiroty;

import com.dorolaw.faultanalysis.entity.FaultAnalysis;
import com.dorolaw.faultanalysis.entity.FaultAnalysisAIReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FaultAnalysisAiReportRepository extends JpaRepository<FaultAnalysisAIReport, Long> {
    @Query("SELECT ar FROM FaultAnalysisAIReport ar " +
            "WHERE ar.faultAnalysis.member.memberId = :memberId " +
            "ORDER BY ar.createdAt DESC")
    List<FaultAnalysisAIReport> findAllByMemberId(@Param("memberId") Long memberId);

    Optional<FaultAnalysisAIReport> findByFaultAnalysis(FaultAnalysis faultAnalysis);
}