package com.example.projectx.global.jwt.filter;

import com.example.projectx.domain.member.dto.MemberDTO;
import com.example.projectx.global.jwt.entity.RefreshEntity;
import com.example.projectx.global.jwt.repository.RefreshRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

@RequiredArgsConstructor
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter { // 용도 : 로그인 요청 필터

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    // 로그인 요청이 들어왔을 때 실행되는 메소드
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        MemberDTO requestMember = new MemberDTO();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            requestMember = objectMapper.readValue(messageBody, MemberDTO.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String email = requestMember.getEmail();
        String memberPwd = requestMember.getMemberPwd();
        log.info("email : " + email);
        log.info("memberPwd : " + memberPwd);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, memberPwd);

        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        log.info("로그인 성공");

        String email = authentication.getName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String access = jwtUtil.createJwt("access", email, role, 24*60*60*1000L); // 10분 유효
        String refresh = jwtUtil.createJwt("refresh", email, role, 24*60*60*1000L); // 24시간 유효

        addRefreshEntity(email, refresh, 24*60*60*1000L);

        response.setHeader("Authorization", access);
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        log.info("로그인 실패");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    // refresh 토큰을 DB에 저장하는 메소드
    private void addRefreshEntity(String email, String refresh, Long expiredMs){

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = RefreshEntity.builder()
                .email(email)
                .refresh(refresh)
                .expiration(date.toString())
                .build();

        refreshRepository.save(refreshEntity);
    }


    // 쿠키 생성 메소드
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60); // 24시간 유효
//        cookie.setSecure(true); // https에서만 사용 가능
//        cookie.setPath("/"); // 모든 경로에서 접근 가능
        cookie.setHttpOnly(true); // 자바스크립트에서 접근 불가

        return cookie;
    }
}
