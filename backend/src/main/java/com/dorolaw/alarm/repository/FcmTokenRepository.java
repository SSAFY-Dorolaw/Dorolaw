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

    @Query("SELECT ft FROM FcmToken ft " +
            "WHERE ft.updatedAt = (" +
            "SELECT MAX(ft2.updatedAt) FROM FcmToken ft2 WHERE ft2.member.memberId = ft.member.memberId" +
            ") " +
            "AND ft.member.memberId IN :memberIds")
    List<FcmToken> findLatestTokensByMemberIds(@Param("memberIds") List<Long> memberIds);

    // userId로 조회하여 가장 최신(업데이트된 날짜가 가장 최근) 토큰을 리턴
    Optional<FcmToken> findTopByMemberIdOrderByUpdatedAtDesc(Long memberId);
}
