package com.dorolaw.consultation.repository;

import com.dorolaw.consultation.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
