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
import java.util.Optional;
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
    public Member insertPrivacy(RequestMember requestMember) {

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

        Member findMember = memberRepository.findMemberWithEducationsAndCareersByMemberNo(requestMember.getMemberNo());

        if(findMember == null){
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        findMember.updatePrivacy(requestMember.getPhone(), requestMember.getBirthDate(), requestMember.getIntroduction(), requestMember.getGitAddress());

        for(int i = 0; i < educations.size(); i++){
            findMember.addEducation(educations.get(i));
        }
        for(int i = 0; i < careers.size(); i++){
            findMember.addCareer(careers.get(i));
        }

        return findMember;
    }
}
