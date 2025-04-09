package com.dorolaw.alarm.repository;

import com.dorolaw.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query(value = "SELECT * FROM alarms WHERE receive_member_id = :memberId ORDER BY created_at DESC", nativeQuery = true)
    List<Alarm> findAlarmsByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId);
}
