package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseEducation {

    private Long educationNo;
    private String degree;
    private String major;
    private String schoolName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Member member;
}
