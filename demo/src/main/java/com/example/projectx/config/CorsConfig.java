package com.example.projectx.config;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*"); // 모든 IP에 대해 응답 허용
        config.setAllowCredentials(true); // 쿠키 사용 허용
        config.addAllowedMethod("*"); // 모든 메소드 허용
        config.addAllowedHeader("*"); // 모든 헤더 허용
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter();
    }
}
