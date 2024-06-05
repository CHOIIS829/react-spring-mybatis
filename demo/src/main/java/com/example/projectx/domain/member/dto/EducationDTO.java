package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Education;
import com.example.projectx.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EducationDTO {

    private Long educationNo;
    private String degree;
    private String major;
    private String schoolName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Member member;

    // dto -> entity
    public Education toEntity(){
        return Education.builder()
                .educationNo(this.educationNo)
                .degree(this.degree)
                .major(this.major)
                .schoolName(this.schoolName)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }

    // entity -> dto
    public static EducationDTO toDTO(Education education){
        return EducationDTO.builder()
                .educationNo(education.getEducationNo())
                .degree(education.getDegree())
                .major(education.getMajor())
                .schoolName(education.getSchoolName())
                .startDate(education.getStartDate())
                .endDate(education.getEndDate())
                .build();
    }
}
