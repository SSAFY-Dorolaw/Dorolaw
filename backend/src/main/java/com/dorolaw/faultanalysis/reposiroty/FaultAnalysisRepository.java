package com.dorolaw.faultanalysis.reposiroty;

import com.dorolaw.faultanalysis.entity.FaultAnalysis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaultAnalysisRepository extends JpaRepository<FaultAnalysis, Long> {
    Page<FaultAnalysis> findByMemberIdOrIsPublicTrue(Long memberId, Pageable pageable);
}
