package com.dorolaw.member.repository;

import com.dorolaw.member.entity.Member;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @Cacheable(value = "members", key = "#kakaoId")
    Optional<Member> findBySocialId(Long socialId);

    @Cacheable(value = "members", key = "#id")
    @Override
    Optional<Member> findById(Long id);
}
