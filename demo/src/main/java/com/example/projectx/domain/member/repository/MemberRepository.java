package com.example.projectx.domain.member.repository;

import com.example.projectx.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Member findByEmail(String email);
    @Query("SELECT m FROM Member m " +
            "LEFT JOIN m.educations e " +
            "LEFT JOIN m.careers c " +
            "WHERE m.memberNo = :memberNo")
    Member findMemberWithEducationsAndCareersByMemberNo(@Param("memberNo") Long memberNo);
}
