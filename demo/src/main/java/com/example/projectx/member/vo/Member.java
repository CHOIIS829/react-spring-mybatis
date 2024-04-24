package com.example.projectx.member.vo;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private Long id;
    private String email;
    private String password;
    private String name;
}
