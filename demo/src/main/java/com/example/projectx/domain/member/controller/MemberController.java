package com.example.projectx.domain.member.controller;

import com.example.projectx.domain.member.dto.*;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.service.MemberService;
import com.example.projectx.global.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    // 개인정보 등록
    @PostMapping("/privacy")
    public ResponseEntity<ResponseDto> privacy(@RequestBody MemberDTO requestMember){

        MemberDTO responseMember = memberService.insertPrivacy(requestMember);

        ResponseDto responseDto = ResponseDto.builder()
                .data(responseMember)
                .success(true)
                .message("개인정보 등록에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    // 프로필 사진 등록
    @PostMapping("/profile")
    public ResponseEntity<ResponseDto> profile(@RequestParam MultipartFile file, @RequestParam String email){
        String url = memberService.profile(file, email);

        ResponseDto responseDto = ResponseDto.builder()
                .data(url)
                .success(true)
                .message("프로필 사진 등록에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }
}
