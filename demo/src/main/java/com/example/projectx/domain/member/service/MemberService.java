package com.example.projectx.domain.member.service;


import com.example.projectx.domain.member.dto.RequestCareer;
import com.example.projectx.domain.member.dto.RequestEducation;
import com.example.projectx.domain.member.entity.Career;
import com.example.projectx.domain.member.entity.Education;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.dto.RequestMember;
import com.example.projectx.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public Member signup(RequestMember requestMember) {

        // email 중복 체크
        if(memberRepository.existsByEmail(requestMember.getEmail())){
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        Member member = Member.builder()
                .email(requestMember.getEmail())
                .memberPwd(bCryptPasswordEncoder.encode(requestMember.getMemberPwd()))
                .memberName(requestMember.getMemberName())
                .role("ROLE_USER")
                .build();

        return memberRepository.save(member);
    }

    @Transactional
    public void insertPrivacy(RequestMember requestMember) {

        List<Education> educations = requestMember.getEducations().stream()
                .map(requestEducation -> Education.builder()
                        .degree(requestEducation.getDegree())
                        .major(requestEducation.getMajor())
                        .schoolName(requestEducation.getSchoolName())
                        .startDate(requestEducation.getStartDate())
                        .endDate(requestEducation.getEndDate())
                        .build())
                .collect(Collectors.toList());

        List<Career> careers = requestMember.getCareers().stream()
                .map(requestCareer -> Career.builder()
                        .companyName(requestCareer.getCompanyName())
                        .startDate(requestCareer.getStartDate())
                        .endDate(requestCareer.getEndDate())
                        .build())
                .collect(Collectors.toList());

        log.info("educations: {}", educations);
        log.info("careers: {}", careers);

        // Member, Education, Career 조회
        Member member = memberRepository.findByMemberNo(requestMember.getMemberNo());

        log.info("member: {}", member);
    }
}
