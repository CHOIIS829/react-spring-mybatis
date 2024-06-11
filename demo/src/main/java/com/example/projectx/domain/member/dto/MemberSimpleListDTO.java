package com.example.projectx.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSimpleListDTO {
    private Long memberNo;
    private String email;
    private String memberName;
    private String phone;
    private LocalDate birthDate;
    private String role;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
