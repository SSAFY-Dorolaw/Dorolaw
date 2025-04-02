package com.dorolaw.member.repository;

import com.dorolaw.member.entity.lawyer.LawyerSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LawyerScheduleRepository extends JpaRepository<LawyerSchedule, Long> {
}
