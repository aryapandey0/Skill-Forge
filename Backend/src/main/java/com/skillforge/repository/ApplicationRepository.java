package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skillforge.model.JobApplication;

public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {

    // Find all applications by applicant (User ka ID)
    List<JobApplication> findByApplicantId(long applicantId);

    // Find all applications by recruiter (Recruiter ka ID)
    List<JobApplication> findByJobId(long jobId);

    // Check if applicant already applied to a specific job
    boolean existsByApplicantIdAndJobId(long applicantId, long jobId);
    
    
}
