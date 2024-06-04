package com.example.projectx.domain.member.controller;

import com.example.projectx.domain.member.dto.RequestCareer;
import com.example.projectx.domain.member.dto.RequestEducation;
import com.example.projectx.domain.member.dto.RequestMember;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.service.MemberService;
import com.example.projectx.global.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    // 개인정보 등록
    @PostMapping("/privacy")
    public ResponseEntity<ResponseDto> privacy(@RequestBody RequestMember requestMember){
        log.info("privacy requestMember : {}", requestMember);
        Member findMember = memberService.insertPrivacy(requestMember);

        ResponseDto responseDto = ResponseDto.builder()
                .data(findMember)
                .success(true)
                .message("개인정보 등록에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }
}
