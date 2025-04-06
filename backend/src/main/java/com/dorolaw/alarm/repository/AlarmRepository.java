package com.dorolaw.alarm.repository;

import com.dorolaw.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByReceiveMember_MemberIdOrderByCreatedAtDesc(Long memberId);
}
