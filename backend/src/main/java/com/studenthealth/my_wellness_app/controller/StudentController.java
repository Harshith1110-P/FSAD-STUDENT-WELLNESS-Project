package com.studenthealth.my_wellness_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.studenthealth.my_wellness_app.model.*;
import com.studenthealth.my_wellness_app.repository.*;
import java.util.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class StudentController {
    
    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private CounselingRequestRepository counselingRequestRepository;

    @Autowired
    private WellnessGoalRepository wellnessGoalRepository;

    @Autowired
    private EmergencyAlertRepository emergencyAlertRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard(@RequestParam String studentId) {
        List<HealthRecord> records = healthRecordRepository.findByStudentId(studentId);
        List<Appointment> appointments = appointmentRepository.findByStudentId(studentId);
        List<CounselingRequest> counseling = counselingRequestRepository.findByStudentId(studentId);
        List<WellnessGoal> goals = wellnessGoalRepository.findByStudentId(studentId);
        
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalRecords", records.size());
        dashboard.put("upcomingAppointmentsCount", appointments.size());
        dashboard.put("counselingRequestsCount", counseling.size());
        dashboard.put("wellnessProgress", goals.isEmpty() ? 0 : (int)(goals.stream().filter(WellnessGoal::isCompleted).count() * 100 / goals.size()));
        dashboard.put("lastCheckup", records.isEmpty() ? "N/A" : records.get(0).getDate());
        dashboard.put("message", "Welcome to Dashboard");
        dashboard.put("appointments", appointments);
        return dashboard;
    }

    @GetMapping("/wellness-goals")
    public List<WellnessGoal> getWellnessGoals(@RequestParam String studentId) {
        List<WellnessGoal> goals = wellnessGoalRepository.findByStudentId(studentId);
        if (goals.isEmpty()) {
            goals = Arrays.asList(
                new WellnessGoal(studentId, "Morning meditation (10 min)", "mental"),
                new WellnessGoal(studentId, "Drink 8 glasses of water", "nutrition"),
                new WellnessGoal(studentId, "30-minute walk", "physical"),
                new WellnessGoal(studentId, "No screen time before bed", "sleep")
            );
            wellnessGoalRepository.saveAll(goals);
        }
        return goals;
    }

    @PutMapping("/wellness-goals/{id}/toggle")
    public WellnessGoal toggleGoal(@PathVariable Long id) {
        WellnessGoal goal = wellnessGoalRepository.findById(id).orElseThrow();
        goal.setCompleted(!goal.isCompleted());
        return wellnessGoalRepository.save(goal);
    }

    @GetMapping("/health-records")
    public List<HealthRecord> getHealthRecords(@RequestParam String studentId) {
        return healthRecordRepository.findByStudentId(studentId);
    }

    @PostMapping("/health-records")
    public HealthRecord addHealthRecord(@RequestBody HealthRecord record) {
        return healthRecordRepository.save(record);
    }

    @PutMapping("/health-records/{id}")
    public HealthRecord updateHealthRecord(@PathVariable Long id, @RequestBody HealthRecord recordDetails) {
        HealthRecord record = healthRecordRepository.findById(id).orElseThrow();
        record.setType(recordDetails.getType());
        record.setTitle(recordDetails.getTitle());
        record.setDate(recordDetails.getDate());
        record.setDoctor(recordDetails.getDoctor());
        record.setStatus(recordDetails.getStatus());
        record.setSummary(recordDetails.getSummary());
        record.setConditions(recordDetails.getConditions());
        record.setNotes(recordDetails.getNotes());
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

    @GetMapping("/appointments")
    public List<Appointment> getAppointments(@RequestParam String studentId) {
        return appointmentRepository.findByStudentId(studentId);
    }

    @PostMapping("/appointments")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        try {
            System.out.println("Processing appointment booking for student: " + appointment.getStudentId());
            appointment.setStatus("confirmed");
            if (appointment.getLocation() == null) {
                appointment.setLocation("Campus Health Center - Room 102");
            }
            return appointmentRepository.save(appointment);
        } catch (Exception e) {
            System.err.println("CRITICAL ERROR booking appointment: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/counseling")
    public List<CounselingRequest> getCounselingRequests(@RequestParam String studentId) {
        return counselingRequestRepository.findByStudentId(studentId);
    }

    @PostMapping("/counseling")
    public CounselingRequest requestCounseling(@RequestBody CounselingRequest request) {
        try {
            System.out.println("Processing counseling request for student: " + request.getStudentId());
            return counselingRequestRepository.save(request);
        } catch (Exception e) {
            System.err.println("ERROR in counseling request: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping("/emergency-alert")
    public EmergencyAlert triggerAlert(@RequestBody EmergencyAlert alert) {
        return emergencyAlertRepository.save(alert);
    }

    @DeleteMapping("/appointments/{id}")
    public Map<String, Object> deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Appointment cancelled successfully");
        return response;
    }
}