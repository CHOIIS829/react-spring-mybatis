package com.example.projectx.domain.member.entity;

import com.example.projectx.global.BaseEntity;
import com.example.projectx.domain.board.entity.Board;
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

    @Column(name = "ROLE")
    private String role;

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

    public void updatePrivacy(String phone, LocalDate birthDate, String introduction, String gitAddress){
        this.phone = phone;
        this.birthDate = birthDate;
        this.introduction = introduction;
        this.gitAddress = gitAddress;
    }
}
