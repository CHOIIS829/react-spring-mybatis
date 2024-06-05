package com.example.projectx.domain.member.controller;


import com.example.projectx.domain.member.dto.MemberDTO;
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
    public ResponseEntity<ResponseDto> signup(@RequestBody MemberDTO requestMember){

        Member member = memberService.signup(requestMember);

        MemberDTO responseMember = MemberDTO.builder()
                .memberNo(member.getMemberNo())
                .email(member.getEmail())
                .memberName(member.getMemberName())
                .build();


        ResponseDto responseDto = ResponseDto.builder()
                .data(responseMember)
                .success(true)
                .message("회원가입에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

}
