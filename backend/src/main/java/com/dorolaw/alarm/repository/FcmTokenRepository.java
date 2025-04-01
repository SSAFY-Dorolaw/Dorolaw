package com.dorolaw.alarm.repository;

import com.dorolaw.alarm.entity.FcmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {
    Optional<FcmToken> findByToken(String token);

    List<FcmToken> findByMember_MemberId(Long memberId);

    @Query("select distinct f from FcmToken f " +
            "join f.member m " +
            "join m.lawyerTags t " +
            "where m.status = 'CERTIFIED_LAWYER' " +
            "and (t.lawyerSpeciality = 'ALL' OR t.lawyerSpeciality = :tag)")
    List<FcmToken> findLawyersByTags(@Param("tag") String tag);
}
