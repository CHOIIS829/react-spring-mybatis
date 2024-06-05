package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Career;
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
public class CareerDTO {

    private Long careerNo;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Member member;

    // dto -> entity
    public Career toEntity(){
        return Career.builder()
                .careerNo(this.careerNo)
                .companyName(this.companyName)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }

    // entity -> dto
    public static CareerDTO toDTO(Career career){
        return CareerDTO.builder()
                .careerNo(career.getCareerNo())
                .companyName(career.getCompanyName())
                .startDate(career.getStartDate())
                .endDate(career.getEndDate())
                .build();
    }

}
