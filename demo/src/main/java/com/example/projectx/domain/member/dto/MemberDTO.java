package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Career;
import com.example.projectx.domain.member.entity.Education;
import com.example.projectx.domain.board.entity.Board;
import com.example.projectx.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberDTO {
    private Long memberNo;
    private String email;
    private String memberPwd; 
    private String memberName;
    private String phone;
    private LocalDate birthDate;
    private String introduction;
    private String profileImg;
    private String gitAddress;
    private String role;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private List<EducationDTO> educations = new ArrayList<>();
    private List<CareerDTO> careers = new ArrayList<>();

    public static MemberDTO toDTO(Member member){
        return MemberDTO.builder()
                .memberNo(member.getMemberNo())
                .email(member.getEmail())
                .memberPwd(member.getMemberPwd())
                .memberName(member.getMemberName())
                .phone(member.getPhone())
                .birthDate(member.getBirthDate())
                .introduction(member.getIntroduction())
                .profileImg(member.getProfileImg())
                .gitAddress(member.getGitAddress())
                .role(member.getRole())
                .createAt(member.getCreateAt())
                .updateAt(member.getUpdateAt())
                .educations(member.getEducations().stream()
                        .map(education -> EducationDTO.toDTO(education))
                        .collect(Collectors.toList()))
                .careers(member.getCareers().stream()
                        .map(career -> CareerDTO.toDTO(career))
                        .collect(Collectors.toList()))
                .build();
    }
}
