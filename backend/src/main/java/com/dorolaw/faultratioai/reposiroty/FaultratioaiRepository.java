package com.dorolaw.faultratioai.reposiroty;

import com.dorolaw.faultratioai.entity.AiReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FaultratioaiRepository extends JpaRepository<AiReport, Long> {
    @Query("SELECT ar FROM AiReport ar " +
            "WHERE ar.request.memberId = :memberId " +
            "ORDER BY ar.createdAt DESC")
    List<AiReport> findAllByMemberId(@Param("memberId") Long memberId);
}
