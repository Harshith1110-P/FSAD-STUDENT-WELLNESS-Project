package com.studenthealth.my_wellness_app.service;

import com.studenthealth.my_wellness_app.model.HealthRecord;
import com.studenthealth.my_wellness_app.model.User;
import com.studenthealth.my_wellness_app.repository.HealthRecordRepository;
import com.studenthealth.my_wellness_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SeedService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void seedDatabase() {
        // 1. Seed Admin if not exists
        if (!userRepository.existsByEmail("admin@university.edu")) {
            User admin = new User("Admin User", "admin@university.edu", passwordEncoder.encode("admin123"), "ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Seeded Admin User (Encoded)");
        }

        // 2. Seed Your Personal Account if not exists
        if (!userRepository.existsByEmail("harshith11102006@gmail.com")) {
            User user = new User("Harshith", "harshith11102006@gmail.com", passwordEncoder.encode("444444"), "STUDENT");
            user.setStudentId("STU20261110");
            user.setCourse("Full Stack Development");
            user.setYear(1);
            userRepository.save(user);
            System.out.println("✅ Seeded Your Personal Account: harshith11102006@gmail.com");
        }

        // 3. Seed Student 1 if not exists
        if (!userRepository.existsByEmail("priya@university.edu")) {
            User s1 = new User("Priya Patel", "priya@university.edu", passwordEncoder.encode("student123"), "STUDENT");
            s1.setStudentId("STU2024001");
            s1.setCourse("Computer Science");
            s1.setYear(3);
            userRepository.save(s1);
            System.out.println("✅ Seeded Student: Priya Patel (Encoded)");
        }

        // 4. Seed Health Records if empty
        if (healthRecordRepository.count() == 0) {
            HealthRecord r1 = new HealthRecord();
            r1.setStudentId("STU2024001");
            r1.setStudentName("Priya Patel");
            r1.setType("lab");
            r1.setTitle("Blood Test");
            r1.setDate("Feb 18, 2024");
            r1.setStatus("normal");
            r1.setSummary("All values within range");
            healthRecordRepository.save(r1);
            System.out.println("✅ Seeded Initial Health Records");
        }
    }
}
