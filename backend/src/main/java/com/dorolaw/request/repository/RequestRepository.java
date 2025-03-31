package com.dorolaw.request.repository;

import com.dorolaw.request.entity.Request;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    Page<Request> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("select distinct r from Request r " +
            "left join fetch r.aiReport " +
            "left join fetch r.answers " +
            "where r.requestId = :requestId")
    Optional<Request> findRequestDetail(@Param("requestId") Long requestId);
}
