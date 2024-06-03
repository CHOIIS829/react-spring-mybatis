package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestCareer {

    private Long careerNo;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Member member;

}
