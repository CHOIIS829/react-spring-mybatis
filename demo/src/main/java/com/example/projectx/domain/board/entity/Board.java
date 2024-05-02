package com.example.projectx.domain.board.entity;

import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.global.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = "member")
@Builder
@Entity
@Table(name = "BOARD")
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_NO")
    private Long boardNo;

    @Column(name = "BOARD_TITLE")
    private String boardTitle;

    @Column(name = "BOARD_CONTENT")
    private String boardContent;

    @Column(name = "JOB")
    private String job;

    @Column(name = "SKILLSET")
    private String skillset;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }
}
