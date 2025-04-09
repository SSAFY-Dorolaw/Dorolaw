package com.dorolaw.alarm.repository;

import com.dorolaw.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query(value = "SELECT * FROM alarms WHERE receive_member_id = :memberId ORDER BY created_at DESC", nativeQuery = true)
    List<Alarm> findAlarmsByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId);

    @Modifying
    @Transactional
    @Query("UPDATE Alarm a SET a.isRead = true WHERE a.receiveMember.memberId = :memberId AND a.isRead = false")
    void markAllAsReadByMemberId(Long memberId);
}
