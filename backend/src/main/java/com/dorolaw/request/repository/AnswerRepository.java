package com.dorolaw.request.repository;

import com.dorolaw.request.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    // List<Answer> findByLawyerId(Long lawyerId);

    // 변호사 ID로 답변과 연관된 의뢰 정보를 함께 조회 (성능 최적화)
    @Query("SELECT a FROM Answer a JOIN FETCH a.request WHERE a.lawyer.memberId = :lawyerId ORDER BY a.createdAt DESC")
    List<Answer> findByLawyerIdWithRequest(@Param("lawyerId") Long lawyerId);

    // 변호사가 작성한 답변 목록을 최신순으로 조회
    @Query("SELECT a FROM Answer a JOIN FETCH a.request r JOIN FETCH r.member WHERE a.lawyer.memberId = :lawyerId ORDER BY a.createdAt DESC")
    List<Answer> findByLawyerIdOrderByCreatedAtDesc(@Param("lawyerId") Long lawyerId);
}

