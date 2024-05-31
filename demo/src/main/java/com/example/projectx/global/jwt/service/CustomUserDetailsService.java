package com.example.projectx.global.jwt.service;

import com.example.projectx.global.jwt.dto.CustomUserDetails;
import com.example.projectx.domain.member.entity.Member;
import com.example.projectx.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService { // 용도 : 사용자 정보를 가져오는 서비스

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("사용자 정보 가져오기-----------------------------------");
        Member member = memberRepository.findByEmail(username);

        if(member != null){
            log.info("사용자 정보 존재-----------------------------------");
            return new CustomUserDetails(member);
        }
        log.info("사용자 정보 없음-----------------------------------");
        return null;
    }
}
