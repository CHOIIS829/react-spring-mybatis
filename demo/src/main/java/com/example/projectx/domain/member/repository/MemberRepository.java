package com.example.projectx.domain.member.repository;

import com.example.projectx.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Member findByEmail(String email);
    @Query("SELECT m FROM Member m " +
            "LEFT JOIN m.educations e " +
            "LEFT JOIN m.careers c " +
            "WHERE m.email = :email")
    Member findMemberWithEducationsAndCareersByEmail(@Param("email") String email);
    void deleteByEmail(String email);
    // 회원 목록 조회 ? ~ ? 번째
    @Query("SELECT m.memberNo, m.email, m.memberName, m.phone, m.birthDate, m.role, m.createAt, m.updateAt FROM Member m ORDER BY m.memberNo DESC")
    List<Member> findMembersWithPaging(int start, int end);

}
