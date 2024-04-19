package com.example.projectx.member.dto;

import com.example.projectx.member.vo.Member;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    private Member member;
    private boolean success;
    private String message;
}
