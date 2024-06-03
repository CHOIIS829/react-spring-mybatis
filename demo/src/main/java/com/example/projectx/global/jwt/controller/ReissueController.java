package com.example.projectx.global.jwt.controller;

import com.example.projectx.global.jwt.entity.RefreshEntity;
import com.example.projectx.global.jwt.repository.RefreshRepository;
import com.example.projectx.global.jwt.filter.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequiredArgsConstructor
public class ReissueController { // 용도 : refresh-token 재발급 컨트롤러

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){

        String refresh = null;

        // 쿠키에서 refresh-token 가져오기
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("refresh")){
                refresh = cookie.getValue();
            }
        }

        // 쿠키에 refresh-token이 없을 경우
        if(refresh == null){
            return new ResponseEntity<>("refresh-token이 없습니다.", HttpStatus.BAD_REQUEST);
        }

        // refresh-token 만료 여부 확인
        try{
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e){

            // refresh-token이 만료된 경우 DB에서 삭제
            refreshRepository.deleteByRefresh(refresh);

            return new ResponseEntity<>("refresh-token이 만료되었습니다.", HttpStatus.BAD_REQUEST);
        }

        String category = jwtUtil.getCategory(refresh);

        // refresh-token이 아닐 경우
        if(!category.equals("refresh")){
            return new ResponseEntity<>("refresh-token이 아닙니다.", HttpStatus.BAD_REQUEST);
        }

        Boolean isExist = refreshRepository.existsByRefresh(refresh);

        // refresh-token이 DB에 없을 경우
        if(!isExist){
            return new ResponseEntity<>("존재하지 않는 refresh-token입니다.", HttpStatus.BAD_REQUEST);
        }

        String email = jwtUtil.getEmail(refresh);
        String role = jwtUtil.getRole(refresh);

        String newAccess = jwtUtil.createJwt("access", email, role, 10*60*1000L); // 10분 유효
        String newRefresh = jwtUtil.createJwt("refresh", email, role, 24*60*60*1000L); // 24시간 유효

        // 기존 refresh-token 삭제 후 새로운 refresh-token 추가
        refreshRepository.deleteByRefresh(refresh);
        addRefreshEntity(email, newRefresh, 24*60*60*1000L);

        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>("access-token 재발급 완료", HttpStatus.OK);
    }

    // refresh-token 추가
    private void addRefreshEntity(String email, String refresh, Long expiredMs){
        Date date = new Date(System.currentTimeMillis() + expiredMs);
        RefreshEntity refreshEntity = RefreshEntity.builder()
                .email(email)
                .refresh(refresh)
                .expiration(date.toString())
                .build();

        refreshRepository.save(refreshEntity);
    }

    // 쿠키 생성
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60); // 24시간 유효
//        cookie.setSecure(true); // https에서만 사용 가능
//        cookie.setPath("/"); // 모든 경로에서 접근 가능
        cookie.setHttpOnly(true); // 자바스크립트에서 접근 불가

        return cookie;
    }
}
