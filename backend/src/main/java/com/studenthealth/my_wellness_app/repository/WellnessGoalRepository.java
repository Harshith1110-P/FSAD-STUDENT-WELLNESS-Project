package com.studenthealth.my_wellness_app.repository;

import com.studenthealth.my_wellness_app.model.WellnessGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WellnessGoalRepository extends JpaRepository<WellnessGoal, Long> {
    List<WellnessGoal> findByStudentId(String studentId);
}
