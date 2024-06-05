package com.example.projectx.domain.member.controller;

import com.example.projectx.domain.member.dto.*;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.service.MemberService;
import com.example.projectx.global.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ResponseDto> privacy(@RequestBody RequestMember requestMember){

        Member findMember = memberService.insertPrivacy(requestMember);

        // Map을 사용하여 ResponseEducation 객체로 변환
         List<ResponseEducation> responseEducations = findMember.getEducations().stream()
                 .map(education -> ResponseEducation.builder()
                         .degree(education.getDegree())
                         .major(education.getMajor())
                         .schoolName(education.getSchoolName())
                         .startDate(education.getStartDate())
                         .endDate(education.getEndDate())
                         .build())
                 .collect(Collectors.toList());

            // Map을 사용하여 ResponseCareer 객체로 변환
            List<ResponseCareer> responseCareers = findMember.getCareers().stream()
                    .map(career -> ResponseCareer.builder()
                            .companyName(career.getCompanyName())
                            .startDate(career.getStartDate())
                            .endDate(career.getEndDate())
                            .build())
                    .collect(Collectors.toList());


        ResponseMember responseMember = ResponseMember.builder()
                .memberNo(findMember.getMemberNo())
                .email(findMember.getEmail())
                .memberName(findMember.getMemberName())
                .phone(findMember.getPhone())
                .birthDate(findMember.getBirthDate())
                .introduction(findMember.getIntroduction())
                .profileImg(findMember.getProfileImg())
                .gitAddress(findMember.getGitAddress())
                .role(findMember.getRole())
                .educations(responseEducations)
                .careers(responseCareers)
                .build();

        ResponseDto responseDto = ResponseDto.builder()
                .data(responseMember)
                .success(true)
                .message("개인정보 등록에 성공하였습니다.")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }
}
