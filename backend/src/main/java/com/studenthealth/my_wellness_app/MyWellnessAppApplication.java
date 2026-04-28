package com.studenthealth.my_wellness_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyWellnessAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyWellnessAppApplication.class, args);
    }
    
    // ❌ If you see this method, DELETE it:
    // @Bean
    // public PasswordEncoder passwordEncoder() {
    //     return new BCryptPasswordEncoder();
    // }
}