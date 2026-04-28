package com.studenthealth.my_wellness_app.security;

import org.springframework.stereotype.Component;
import java.util.Base64;

@Component
public class JwtUtil {
    
    public String generateToken(String email, String role) {
        // Simple token for testing
        String token = Base64.getEncoder().encodeToString((email + ":" + role + ":" + System.currentTimeMillis()).getBytes());
        return token;
    }
    
    public String extractEmail(String token) {
        try {
            String decoded = new String(Base64.getDecoder().decode(token));
            return decoded.split(":")[0];
        } catch (Exception e) {
            return null;
        }
    }
    
    public String extractRole(String token) {
        try {
            String decoded = new String(Base64.getDecoder().decode(token));
            return decoded.split(":")[1];
        } catch (Exception e) {
            return "STUDENT";
        }
    }
    
    public boolean validateToken(String token) {
        return token != null && !token.isEmpty();
    }
}