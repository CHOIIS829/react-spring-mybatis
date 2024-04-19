package com.example.projectx.member.controller;

import com.example.projectx.member.dto.LoginResponse;
import com.example.projectx.member.service.MemberService;
import com.example.projectx.member.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
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

    @PostMapping("/api/member/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Member member){
        String email = member.getEmail();
        String password = member.getPassword();

        Member loginMember = memberService.login(email, password);
        if(loginMember != null){
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setMember(loginMember);
            loginResponse.setSuccess(true);
            loginResponse.setMessage("로그인 성공");
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } else {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setSuccess(false);
            loginResponse.setMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
            return new ResponseEntity<>(loginResponse, HttpStatus.UNAUTHORIZED);
        }
    }

}
