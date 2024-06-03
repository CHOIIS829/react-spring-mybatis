package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Career;
import com.example.projectx.domain.member.entity.Education;
import com.example.projectx.domain.board.entity.Board;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestMember {
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
    private List<RequestEducation> educations = new ArrayList<>();
    private List<RequestCareer> careers = new ArrayList<>();
    //private List<RequestBoard> boards = new ArrayList<>();
}
