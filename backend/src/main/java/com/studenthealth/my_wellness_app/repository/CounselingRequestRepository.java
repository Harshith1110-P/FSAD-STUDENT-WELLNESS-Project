package com.studenthealth.my_wellness_app.repository;

import com.studenthealth.my_wellness_app.model.CounselingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CounselingRequestRepository extends JpaRepository<CounselingRequest, Long> {
    List<CounselingRequest> findByStudentId(String studentId);
}
