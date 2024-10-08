package com.example.projectx.domain.member.controller;

import com.example.projectx.domain.member.dto.*;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.service.MemberService;
import com.example.projectx.global.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
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

    // 프로필 사진 삭제
    @DeleteMapping("/profile")
    public ResponseEntity<ResponseDto> deleteProfile(@RequestParam String email){
        memberService.deleteProfile(email);

        ResponseDto responseDto = ResponseDto.builder()
                .success(true)
                .message("프로필 사진 삭제에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    // 회원탈퇴
    @DeleteMapping("/member")
    public ResponseEntity<ResponseDto> deleteMember(@RequestParam String email){
        memberService.deleteMember(email);

        ResponseDto responseDto = ResponseDto.builder()
                .success(true)
                .message("회원탈퇴에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    // 회원리스트 조회
    @GetMapping("/members")
    public ResponseEntity<ResponseDto> members(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Page<MemberSimpleListDTO> memberDTOS = memberService.findMembers(page, size);

        ResponseDto responseDto = ResponseDto.builder()
                .data(memberDTOS)
                .success(true)
                .message("회원리스트 조회에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    // 회원정보 조회
    @GetMapping("/member")
    public ResponseEntity<ResponseDto> member(){
        MemberDTO memberDTO = memberService.findMember();

        ResponseDto responseDto = ResponseDto.builder()
                .data(memberDTO)
                .success(true)
                .message("회원정보 조회에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    // email 찾기
    @GetMapping("/findEmail")
    public ResponseEntity<ResponseDto> findEmail(@RequestParam String memberName, @RequestParam String phone){
        String email = memberService.findEmail(memberName, phone);

        ResponseDto responseDto = ResponseDto.builder()
                .data(email)
                .success(true)
                .message("이메일 찾기에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }
}
