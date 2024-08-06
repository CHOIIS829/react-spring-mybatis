package com.example.projectx.global.jwt.dto;

import com.example.projectx.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails { // UserDetails 인터페이스를 구현한 CustomUserDetails 클래스 (Member를 UserDetails로 변환)

    private final Member member;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // 권한을 리턴하는 메소드
        Collection<GrantedAuthority> collection = new ArrayList<>(); // 권한을 담을 Collection 생성
        collection.add(() -> member.getRole());
        return collection;
    }

    @Override
    public String getPassword() {
        return member.getMemberPwd();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
