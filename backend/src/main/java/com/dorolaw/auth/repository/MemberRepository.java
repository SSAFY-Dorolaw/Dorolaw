package com.dorolaw.auth.repository;

import com.dorolaw.auth.entity.Member;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Cacheable(value = "members", key = "#kakaoId")
    Optional<Member> findBySocialId(Long socialId);
}
