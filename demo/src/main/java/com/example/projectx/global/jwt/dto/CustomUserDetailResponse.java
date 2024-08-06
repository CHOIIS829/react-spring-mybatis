package com.example.projectx.global.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomUserDetailResponse {
    private String email;
    private String name;
    private String phone;
    private LocalDate birthDate;
    private String introduction;
    private String profileImg;
    private String gitAddress;
    private String role;
}
