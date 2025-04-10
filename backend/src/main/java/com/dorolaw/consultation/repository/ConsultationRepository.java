package com.dorolaw.consultation.repository;

import com.dorolaw.consultation.entity.Consultation;
import com.dorolaw.consultation.entity.ConsultationStatus;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerProfile;
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
            "AND c.status IN (:statuses)")
    List<LocalTime> findBookedTimesByLawyerAndDateAndStatuses(
            @Param("lawyerId") Long lawyerId,
            @Param("consultationDate") LocalDate consultationDate,
            @Param("statuses") List<ConsultationStatus> statuses
    );

    List<Consultation> findByClientOrLawyer(Member client, LawyerProfile lawyer);

    List<Consultation> findByClient_MemberId(Long memberId);

    List<Consultation> findByLawyer_LawyerProfileIdOrderByCreatedAtDesc(Long lawyerProfileId);

    Long countByLawyer_LawyerProfileIdAndStatus(Long lawyerProfileId, ConsultationStatus status);

    List<Consultation> findByLawyer_LawyerProfileIdAndConsultationDateOrderByScheduledTime(Long lawyerProfileId, LocalDate consultationDate);
}
