package com.example.projectx.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = "member")
@Builder
@Entity
@Table(name = "EDUCATION")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EDUCATION_NO")
    private Long educationNo;

    @Column(name = "DEGREE")
    private String degree;

    @Column(name = "MAJOR")
    private String major;

    @Column(name = "SCHOOL_NAME")
    private String schoolName;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }
}
