package com.example.projectx.domain.member.repository;

import com.example.projectx.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Member findByEmail(String email);

    // MemberNo로 Member, Education, Career 조회
    @Query("select m, e, c from Member m " +
            "left join fetch m.educations e " +
            "left join fetch m.careers c " +
            "where m.memberNo = :memberNo")
    Member findByMemberNo(Long memberNo);
}
