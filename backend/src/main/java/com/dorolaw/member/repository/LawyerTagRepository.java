package com.dorolaw.member.repository;

import com.dorolaw.alarm.entity.FcmToken;
import com.dorolaw.member.entity.Member;
import com.dorolaw.member.entity.lawyer.LawyerSpeciality;
import com.dorolaw.member.entity.lawyer.LawyerTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LawyerTagRepository extends JpaRepository<LawyerTag, Long> {
    List<LawyerTag> findByLawyerId(Member lawyer);
    void deleteByLawyerId(Member lawyer);

    @Query("select distinct lt.lawyerId " +
            "from LawyerTag lt " +
            "where lt.lawyerSpeciality = :speciality " +
            "   or lt.lawyerSpeciality = com.dorolaw.member.entity.lawyer.LawyerSpeciality.ALL")
    List<Member> findDistinctLawyersBySpeciality(@Param("speciality") LawyerSpeciality speciality);

    @Query("SELECT ft FROM FcmToken ft " +
            "WHERE ft.updatedAt = (" +
            "SELECT MAX(ft2.updatedAt) FROM FcmToken ft2 WHERE ft2.member.memberId = ft.member.memberId" +
            ") " +
            "AND ft.member.memberId IN :memberIds " +
            "AND ft.member.role = com.dorolaw.member.entity.MemberRole.CERTIFIED_LAWYER")
    List<FcmToken> findLatestTokensByMemberIds(@Param("memberIds") List<Long> memberIds);
}