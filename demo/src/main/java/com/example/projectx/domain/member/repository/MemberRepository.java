package com.example.projectx.domain.member.repository;

import com.example.projectx.domain.member.dto.MemberSimpleListDTO;
import com.example.projectx.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Member findByEmail(String email);
    @Query("select m from Member m " +
            "left join fetch m.educations e " +
            "left join fetch m.careers c " +
            "where m.email = :email")
    Member findMemberWithEducationsAndCareersByEmail(@Param("email") String email);
    void deleteByEmail(String email);
    @Query("select new com.example.projectx.domain.member.dto.MemberSimpleListDTO(m.memberNo, m.email, m.memberName, m.phone, m.birthDate, m.role, m.createAt, m.updateAt) " +
            "from Member m")
    Page<MemberSimpleListDTO> findMembers(Pageable pageable);

}
