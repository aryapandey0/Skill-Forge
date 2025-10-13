package com.skillforge.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String resume;       // Resume URL (Cloudinary)
    private String coverLetter;  // Optional
    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED

    private long applicantId;   // User who applied
    private long recruiterId;   // Job recruiter
    private long jobId;         // Job reference

    private LocalDateTime createdAt;

    public JobApplication() {
        this.createdAt = LocalDateTime.now();
    }
}
