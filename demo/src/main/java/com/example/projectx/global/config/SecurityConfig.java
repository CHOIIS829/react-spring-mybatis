package com.example.projectx.global.config;

import com.example.projectx.global.jwt.repository.RefreshRepository;
import com.example.projectx.global.jwt.filter.CustomLogoutFilter;
import com.example.projectx.global.jwt.filter.JWTFilter;
import com.example.projectx.global.jwt.filter.JWTUtil;
import com.example.projectx.global.jwt.filter.LoginFilter;
import com.example.projectx.global.jwt.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); // 허용할 Origin
                        configuration.setAllowedMethods(Collections.singletonList("*")); // 허용할 HTTP Method
                        configuration.setAllowCredentials(true); // Credential 허용 여부
                        configuration.setAllowedHeaders(Collections.singletonList("*")); // 허용할 Header
                        configuration.setMaxAge(3600L); // preflight 요청 결과를 캐시할 시간

                        configuration.setExposedHeaders(Collections.singletonList("Authorization")); // 노출할 Header

                        return configuration;
                    }
                }));
        http
                .csrf((auth) -> auth.disable()); // CSRF 토큰 비활성화
        http
                .formLogin((auth) -> auth.disable()); // 기본 로그인 페이지 비활성화
        http
                .httpBasic((auth) -> auth.disable()); // 기본 http 로그인 비활성화
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/login", "/", "/join").permitAll() // 로그인, 회원가입 페이지는 모두 접근 가능
                        .requestMatchers("/admin").hasRole("ADMIN") // admin 페이지는 ADMIN 권한이 있어야 접근 가능
                        .requestMatchers("/reissue").permitAll() // reissue 페이지는 모두 접근 가능
                        //.requestMatchers("/api/**").permitAll() // api 페이지는 모두 접근 가능
                        .anyRequest().authenticated()); // 그 외의 페이지는 인증이 필요함

        //  Custom Filter 추가
        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshRepository), UsernamePasswordAuthenticationFilter.class);
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);

        //세션 설정 (STATELESS)
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
