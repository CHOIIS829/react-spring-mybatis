package com.example.projectx.member.controller;

import com.example.projectx.member.service.MemberService;
import com.example.projectx.member.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/api/member")
    public int insertMember(@RequestBody Member member) {
        System.out.println(member);
        return memberService.insertMember(member);
    }

    @GetMapping("/api/member")
    public Member findMember(@RequestParam("email") String email) {
        System.out.println(email);
        return memberService.findMember(email);
    }

    @GetMapping("/api/members")
    public ArrayList<Member> findAllMembers() {
        return memberService.findAllMembers();
    }

}
