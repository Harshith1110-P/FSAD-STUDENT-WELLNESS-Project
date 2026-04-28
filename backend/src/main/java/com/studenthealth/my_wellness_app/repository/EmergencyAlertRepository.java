package com.studenthealth.my_wellness_app.repository;

import com.studenthealth.my_wellness_app.model.EmergencyAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyAlertRepository extends JpaRepository<EmergencyAlert, Long> {
}
