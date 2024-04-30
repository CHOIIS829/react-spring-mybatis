package com.example.projectx.member.domain;

import com.example.projectx.common.BaseEntity;
import com.example.projectx.board.domain.Board;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = {"educations", "careers", "boards"})
@Builder
@Entity
@Table(name = "MEMBER")
public class Member extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_NO")
    private Long memberNo;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "MEMBER_PWD")
    private String memberPwd;

    @Column(name = "MEMBER_NAME" , nullable = false)
    private String memberName;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "BIRTH_DATE")
    private LocalDate birthDate;

    @Column(name = "INTRODUCTION")
    private String introduction;

    @Column(name = "PROFILE_IMG")
    private String profileImg;

    @Column(name = "GIT_ADDRESS")
    private String gitAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE")
    private Role role;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educations = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Career> careers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Board> boards = new ArrayList<>();

    //  연관관계 편의 메소드
    public void addEducation(Education education){
        educations.add(education);
        education.setMember(this);
    }

    public void addCareer(Career career){
        careers.add(career);
        career.setMember(this);
    }

    public void addBoard(Board board){
        boards.add(board);
        board.setMember(this);
    }
}
