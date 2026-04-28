package com.studenthealth.my_wellness_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wellness_goals")
public class WellnessGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String task;
    private boolean completed;
    private String category;

    public WellnessGoal() {}

    public WellnessGoal(String studentId, String task, String category) {
        this.studentId = studentId;
        this.task = task;
        this.category = category;
        this.completed = false;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getTask() { return task; }
    public void setTask(String task) { this.task = task; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
