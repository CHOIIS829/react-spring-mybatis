package com.example.projectx.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.csrf((auth) -> auth.disable()); // csrf disable
        http.cors((auth) -> auth.disable()); // cors disable
        http.formLogin((auth) -> auth.disable()); // form login disable
        http.httpBasic((auth) -> auth.disable()); // http basic disable

        //경로별 인가 작업
        http.authorizeHttpRequests((auth) -> auth
                //.requestMatchers("/login", "/", "/join").permitAll() // login, join, home 페이지는 누구나 접근 가능
                .requestMatchers("/**").permitAll()
                //.requestMatchers("/api/**").hasRole("USER")
                //.requestMatchers("/admin").hasRole("ADMIN")
                .anyRequest().authenticated());

        //세션 설정 (STATELESS)
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }


}
