package com.example.projectx.member.domain.dto;

import com.example.projectx.member.domain.Role;
import com.example.projectx.board.domain.Board;
import com.example.projectx.member.domain.Career;
import com.example.projectx.member.domain.Education;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
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
    private Role role;
    private List<Education> educations = new ArrayList<>();
    private List<Career> careers = new ArrayList<>();
    private List<Board> boards = new ArrayList<>();
}
