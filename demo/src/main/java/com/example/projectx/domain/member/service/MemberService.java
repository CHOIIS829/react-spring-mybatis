package com.example.projectx.domain.member.service;


import com.example.projectx.domain.member.dto.CareerDTO;
import com.example.projectx.domain.member.dto.EducationDTO;
import com.example.projectx.domain.member.dto.MemberDTO;
import com.example.projectx.domain.member.entity.Career;
import com.example.projectx.domain.member.entity.Education;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public Member signup(MemberDTO requestMember) {

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
    public MemberDTO insertPrivacy(MemberDTO requestMember) {

        Member findMember = memberRepository.findMemberWithEducationsAndCareersByEmail(requestMember.getEmail());

        if(findMember == null){
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        findMember.updatePrivacy(
                requestMember.getPhone(),
                requestMember.getBirthDate(),
                requestMember.getIntroduction(),
                requestMember.getGitAddress()
        );

        requestMember.getEducations().stream()
                .map(EducationDTO::toEntity)
                .forEach(findMember::addEducation);

        requestMember.getCareers().stream()
                .map(CareerDTO::toEntity)
                .forEach(findMember::addCareer);
        
        Member responseMember = memberRepository.findMemberWithEducationsAndCareersByEmail(requestMember.getEmail());

        return MemberDTO.toDTO(responseMember);
    }
}
