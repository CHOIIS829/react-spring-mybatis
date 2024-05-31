package com.example.projectx.domain.member.controller;


import com.example.projectx.domain.member.dto.RequestMember;
import com.example.projectx.domain.member.dto.ResponseMember;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.service.MemberService;
import com.example.projectx.global.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<ResponseDto> signup(@RequestBody RequestMember requestMember){

        log.info("email: " + requestMember.getEmail());

        Member member = memberService.signup(requestMember);
        ResponseMember responseMember = ResponseMember.builder()
                .memberNo(member.getMemberNo())
                .email(member.getEmail())
                .memberName(member.getMemberName())
                .build();

        ResponseDto responseDto = new ResponseDto();
        responseDto.setData(responseMember);
        responseDto.setSuccess(true);
        responseDto.setMessage("회원가입에 성공하였습니다.");

        return ResponseEntity.ok().body(responseDto);
    }

}
