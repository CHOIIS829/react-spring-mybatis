package com.example.projectx.member.controller;

import com.example.projectx.member.service.MemberService;
import com.example.projectx.member.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/api/member")
    public int insertMember(@RequestBody Member member) {
        return memberService.insertMember(member);
    }

    @GetMapping("/api/member/{id}")
    public Member findMember(@Param("id") Long id) {
        return memberService.findMember(id);
    }

    @GetMapping("/api/member")
    public ArrayList<Member> findAllMembers() {
        return memberService.findAllMembers();
    }

}
