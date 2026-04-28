package com.studenthealth.my_wellness_app.controller;

import com.studenthealth.my_wellness_app.model.HealthRecord;
import com.studenthealth.my_wellness_app.model.User;
import com.studenthealth.my_wellness_app.repository.HealthRecordRepository;
import com.studenthealth.my_wellness_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5175", "http://localhost:5174"})
public class AdminController {

    @Autowired
    private com.studenthealth.my_wellness_app.service.SeedService seedService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @GetMapping("/students")
    public List<User> getAllStudents() {
        return userRepository.findAll().stream()
                .filter(u -> "STUDENT".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/health-records")
    public List<HealthRecord> getAllHealthRecords() {
        return healthRecordRepository.findAll();
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", userRepository.count());
        stats.put("totalRecords", healthRecordRepository.count());
        stats.put("activeCases", 0);
        stats.put("pendingReviews", 0);
        return stats;
    }

    @PostMapping("/seed")
    public Map<String, Object> seedDatabase() {
        seedService.seedDatabase();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Database seeding completed! Existing records were skipped.");
        return response;
    }

    @PostMapping("/health-records")
    public HealthRecord createHealthRecord(@RequestBody HealthRecord record) {
        return healthRecordRepository.save(record);
    }

    @DeleteMapping("/health-records/{id}")
    public Map<String, Object> deleteHealthRecord(@PathVariable Long id) {
        healthRecordRepository.deleteById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Health record deleted successfully");
        return response;
    }
}
