package com.example.projectx.domain.member.controller;


import com.example.projectx.domain.member.dto.RequestMember;
import com.example.projectx.domain.member.dto.ResponseMember;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.service.MemberService;
import com.example.projectx.global.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api")
@RequiredArgsConstructor
//@CrossOrigin("http://localhost:3000")
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<ResponseDto> signup(@RequestBody RequestMember requestMember){
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

    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestBody RequestMember requestMember){
        System.out.println("id: " + requestMember.getEmail());
        System.out.println("pwd: " + requestMember.getMemberPwd());
        ResponseDto responseDto = new ResponseDto();
        responseDto.setSuccess(true);
        responseDto.setMessage("로그인에 성공하였습니다.");

        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("/test")
    public ResponseEntity<ResponseDto> test(){
        ResponseDto responseDto = new ResponseDto();
        responseDto.setSuccess(true);
        responseDto.setMessage("테스트 성공");

        return ResponseEntity.ok().body(responseDto);
    }

}
