package com.studenthealth.my_wellness_app.repository;

import com.studenthealth.my_wellness_app.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByStudentId(String studentId);
}
