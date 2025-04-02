package com.dorolaw.faultratioai.reposiroty;

import com.dorolaw.faultratioai.entity.FaultAnalysisAIReports;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaultAnalysisAiReport extends JpaRepository<FaultAnalysisAIReports, Long> {
}
