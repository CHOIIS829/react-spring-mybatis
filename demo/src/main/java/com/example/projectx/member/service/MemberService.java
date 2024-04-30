package com.example.projectx.member.service;


import com.example.projectx.member.domain.Member;
import com.example.projectx.member.domain.dto.RequestMember;
import com.example.projectx.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member signup(RequestMember requestMember) {

        Member member = Member.builder()
                .email(requestMember.getEmail())
                .memberPwd(requestMember.getMemberPwd())
                .memberName(requestMember.getMemberName())
                .build();

        return memberRepository.save(member);
    }
}
