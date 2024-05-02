package com.example.projectx.domain.member.dto;

import com.example.projectx.domain.member.entity.Career;
import com.example.projectx.domain.member.entity.Education;
import com.example.projectx.domain.member.entity.Role;
import com.example.projectx.domain.board.entity.Board;
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
