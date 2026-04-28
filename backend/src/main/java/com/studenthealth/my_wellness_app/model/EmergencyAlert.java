package com.studenthealth.my_wellness_app.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergency_alerts")
public class EmergencyAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String studentName;
    private String location;
    private String type; // e.g., Medical, Security, Fire
    private LocalDateTime createdAt;

    public EmergencyAlert() {
        this.createdAt = LocalDateTime.now();
    }

    public EmergencyAlert(String studentId, String studentName, String type) {
        this();
        this.studentId = studentId;
        this.studentName = studentName;
        this.type = type;
        this.location = "Current Student Location (GPS)";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
