package com.example.projectx.member.service;

import com.example.projectx.member.mapper.MemberMapper;
import com.example.projectx.member.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper memberMapper;

    public int insertMember(Member member) {
        return memberMapper.insertMember(member);
    }

    public Member findMember(String email) {
        return memberMapper.findMember(email);
    }

    public ArrayList<Member> findAllMembers() {
        return memberMapper.findAllMembers();
    }
}
