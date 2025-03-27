package com.dorolaw.consultation.repository;

import com.dorolaw.consultation.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT COUNT(r) FROM Review r WHERE r.lawyer.memberId = :lawyerId")
    Long countByLawyerId(@Param("lawyerId") Long lawyerId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.lawyer.memberId = :lawyerId")
    Float calculateAverageRatingByLawyerId(@Param("lawyerId") Long lawyerId);

    Optional<Review> findByConsultationId(Long consultationId);
}
