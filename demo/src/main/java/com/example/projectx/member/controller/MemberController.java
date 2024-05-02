package com.example.projectx.member.controller;


import com.example.projectx.global.ResponseDto;
import com.example.projectx.member.entity.Member;
import com.example.projectx.member.dto.RequestMember;
import com.example.projectx.member.dto.ResponseMember;
import com.example.projectx.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/member/signup")
    public ResponseEntity<ResponseDto> signup(@RequestBody RequestMember requestMember){
        try {
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
        } catch (IllegalArgumentException e){
            ResponseDto responseDto = new ResponseDto();
            responseDto.setSuccess(false);
            responseDto.setMessage(e.getMessage());

            return ResponseEntity.badRequest().body(responseDto);
        } catch (Exception e) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setSuccess(false);
            responseDto.setMessage("회원가입에 실패하였습니다.");

            return ResponseEntity.badRequest().body(responseDto);
        }
    }

}
