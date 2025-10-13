package com.skillforge.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillforge.dto.JobApplicationRequestDTO;
import com.skillforge.dto.JobApplicationResponse;
import com.skillforge.model.Job;
import com.skillforge.model.JobApplication;
import com.skillforge.model.User;
import com.skillforge.repository.ApplicationRepository;
import com.skillforge.repository.JobRepository;
import com.skillforge.repository.UserRepository;

@RestController
@RequestMapping("/api/application")
public class JobApplicationController {

    @Autowired
    private ApplicationRepository repo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private UserRepository urepo;

    @Autowired
    private Cloudinary cloudinary;

    /**
     * Apply to a Job
     */
    @PostMapping("/apply/{jobId}")
    public ResponseEntity<JobApplication> applyJob(
            @PathVariable Long jobId,
            @RequestPart("application") JobApplicationRequestDTO dto,
            @RequestPart(value = "resume", required = false) MultipartFile resume) {

        try {
            Job job = jobRepo.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            String resumePath = "";
            if (resume != null && !resume.isEmpty()) {
                Map<String, Object> uploadResult =
                        cloudinary.uploader().upload(resume.getBytes(), ObjectUtils.asMap("resource_type","raw"));
                resumePath = (String) uploadResult.get("secure_url");
            }

            JobApplication application = new JobApplication();
            application.setApplicantId(dto.getApplicantId());
            application.setRecruiterId(job.getRecruiter().getId());
            application.setCoverLetter(dto.getCoverLetter());
            application.setResume(resumePath);
            application.setJobId(jobId);
            application.setStatus("PENDING");

            JobApplication saved = repo.save(application);
            return ResponseEntity.ok(saved);

        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get Jobs applied by Applicant
     */
    @GetMapping("/applied/{userId}")
    public List<JobApplicationResponse> getMyAppliedJobs(@PathVariable long userId) {
        return repo.findByApplicantId(userId).stream().map(app -> {
            User applicant = urepo.findById(app.getApplicantId())
                    .orElseThrow(() -> new RuntimeException("Applicant not found"));
            return new JobApplicationResponse(
                    app.getId(),
                    app.getResume(),
                    app.getCoverLetter(),
                    app.getStatus(),
                    app.getCreatedAt(),
                    applicant.getName(),
                    applicant.getEmail()
            );
        }).collect(Collectors.toList());
    }

    

   
    @GetMapping("/check/{userId}/{jobId}")
    public boolean isApplied(@PathVariable long userId, @PathVariable long jobId) {
        return repo.existsByApplicantIdAndJobId(userId, jobId);
    }
    
    @GetMapping("/job-applications/{jobId}")
    public List<JobApplicationResponse> getAllApplications(@PathVariable long jobId) {
        return repo.findByJobId(jobId).stream().map(app -> {
            User applicant = urepo.findById(app.getApplicantId())
                    .orElseThrow(() -> new RuntimeException("Applicant not found"));
            return new JobApplicationResponse(
                    app.getId(),
                    app.getResume(),
                    app.getCoverLetter(),
                    app.getStatus(),
                    app.getCreatedAt(),
                    applicant.getName(),
                    applicant.getEmail()
            );
        }).collect(Collectors.toList());
    }
    
}
