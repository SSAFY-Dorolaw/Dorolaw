package com.dorolaw.consultation.repository;

import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.entity.ConsultationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    @Query("SELECT c.scheduledTime FROM Consultation c " +
            "WHERE c.lawyer.lawyerProfileId = :lawyerId " +
            "AND c.consultationDate = :consultationDate " +
            "AND c.status = :status")
    List<LocalTime> findBookedTimesByLawyerAndDate(
            @Param("lawyerId") Long lawyerId,
            @Param("consultationDate") LocalDate consultationDate,
            @Param("status") ConsultationStatus status
    );
}
