package com.example.projectx.global.jwt.filter;

import com.example.projectx.global.jwt.dto.CustomUserDetails;
import com.example.projectx.domain.member.entity.Member;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Slf4j
public class JWTFilter extends OncePerRequestFilter { // 용도 : JWT 토큰을 검증하는 필터

    private final JWTUtil jwtUtil;
    public static final String HEADER_STRING = "Authorization";
    // JWT 토큰을 검증하는 필터
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader(HEADER_STRING);
        // 헤더에 access 토큰이 없을 경우
        if(accessToken == null){
           filterChain.doFilter(request, response);
           return;
        }

        // 토큰 만료 여부 확인
        try{
            jwtUtil.isExpired(accessToken); //
        } catch (ExpiredJwtException e){
            PrintWriter writer = response.getWriter();
            writer.println("토큰 만료되었습니다. 다시 로그인 해주세요.");

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String category = jwtUtil.getCategory(accessToken);

        // 토큰의 category가 access가 아닐 경우
        if(!category.equals("access")){

            PrintWriter writer = response.getWriter();
            writer.println("invalid access-token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String email = jwtUtil.getEmail(accessToken);
        String role = jwtUtil.getRole(accessToken);

        log.info(email);
        log.info(role);

        Member member = Member.builder()
                .email(email)
                .role(role)
                .build();

        CustomUserDetails customUserDetails = new CustomUserDetails(member); // CustomUserDetails 객체 생성

        //this grants access
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities()); // Authentication 객체 생성
        SecurityContextHolder.getContext().setAuthentication(authToken); // SecurityContextHolder에 Authentication 객체 저장

        filterChain.doFilter(request, response); // 다음 필터로 넘어감 =>
    }

}
