package com.dorolaw.faultratioai.reposiroty;

import com.dorolaw.faultratioai.entity.FaultAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaultAnalysisRepository extends JpaRepository<FaultAnalysis, Long> {
}
