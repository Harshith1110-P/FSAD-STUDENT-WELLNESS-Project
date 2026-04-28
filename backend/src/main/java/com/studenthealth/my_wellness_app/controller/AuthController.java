package com.studenthealth.my_wellness_app.controller;

import com.studenthealth.my_wellness_app.model.User;
import com.studenthealth.my_wellness_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5175", "http://localhost:5174"})
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("token", "dummy-jwt-token-" + user.getId());
                
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", user.getId());
                userData.put("name", user.getName());
                userData.put("email", user.getEmail());
                userData.put("role", user.getRole().toLowerCase());
                userData.put("studentId", user.getStudentId() != null ? user.getStudentId() : "");
                userData.put("course", user.getCourse() != null ? user.getCourse() : "");
                userData.put("year", user.getYear());
                
                response.put("user", userData);
                return response;
            }
        }
        
        response.put("success", false);
        response.put("message", "Invalid email or password");
        return response;
    }
    
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByEmail(email)) {
            response.put("success", false);
            response.put("message", "User with this email already exists");
            return response;
        }

        User user = new User();
        user.setName(userData.get("name"));
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(userData.get("password")));
        user.setRole("STUDENT");
        user.setStudentId(userData.get("studentId"));
        user.setCourse(userData.get("course"));
        
        try {
            if (userData.containsKey("year")) {
                user.setYear(Integer.parseInt(userData.get("year").toString()));
            }
        } catch (NumberFormatException e) {
            user.setYear(1);
        }

        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully! You can now log in.");
        return response;
    }

    @PutMapping("/profile")
    public Map<String, Object> updateProfile(@RequestBody Map<String, Object> userData) {
        String email = (String) userData.get("email");
        Optional<User> userOpt = userRepository.findByEmail(email);
        Map<String, Object> response = new HashMap<>();
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (userData.containsKey("name")) user.setName((String) userData.get("name"));
            if (userData.containsKey("course")) user.setCourse((String) userData.get("course"));
            if (userData.containsKey("year")) {
                Object year = userData.get("year");
                user.setYear(year instanceof String ? Integer.parseInt((String) year) : (Integer) year);
            }
            userRepository.save(user);
            
            response.put("success", true);
            response.put("message", "Profile updated successfully");
            
            Map<String, Object> updatedUser = new HashMap<>();
            updatedUser.put("id", user.getId());
            updatedUser.put("name", user.getName());
            updatedUser.put("email", user.getEmail());
            updatedUser.put("role", user.getRole().toLowerCase());
            updatedUser.put("studentId", user.getStudentId());
            updatedUser.put("course", user.getCourse());
            updatedUser.put("year", user.getYear());
            response.put("user", updatedUser);
            
            return response;
        }
        
        response.put("success", false);
        response.put("message", "User not found");
        return response;
    }
}