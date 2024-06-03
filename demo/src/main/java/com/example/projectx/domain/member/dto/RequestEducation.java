package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestEducation {

    private Long educationNo;
    private String degree;
    private String major;
    private String schoolName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Member member;
}
