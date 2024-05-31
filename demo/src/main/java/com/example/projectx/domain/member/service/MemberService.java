package com.example.projectx.domain.member.service;


import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.dto.RequestMember;
import com.example.projectx.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
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
}
