package com.skillforge.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.skillforge.dto.JobResponse;
import com.skillforge.model.Job;
import com.skillforge.model.User;
import com.skillforge.repository.JobRepository;
import com.skillforge.repository.UserRepository;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository repo;

    @Autowired
    private UserRepository urepo;

    // ✅ Job create
    @PostMapping
    public ResponseEntity<JobResponse> createJob(@RequestBody Job job) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User recruiter = urepo.findByEmail(username) // ya findByUsername
                .orElseThrow(() -> new RuntimeException("Recruiter not found with username: " + username));

        job.setRecruiter(recruiter);
        Job savedJob = repo.save(job);

        JobResponse res = mapToResponse(savedJob);
        return ResponseEntity.ok(res);
    }

    // ✅ All jobs (DTO)
    @GetMapping("/all")
    public List<JobResponse> getAllJobs() {
        return repo.findAll()
                   .stream()
                   .map(this::mapToResponse)
                   .collect(Collectors.toList());
    }

    // ✅ Recruiter ke jobs (DTO)
    @GetMapping("/recruiter/{userId}")
    public List<JobResponse> findByRecruiterId(@PathVariable long userId) {
        return repo.findByRecruiterId(userId)
                   .stream()
                   .map(this::mapToResponse)
                   .collect(Collectors.toList());
    }

    // ✅ Mapper method (entity -> DTO)
    private JobResponse mapToResponse(Job job) {
    	User u = urepo.findById(job.getRecruiter().getId()).get();
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .company(job.getCompany())
                .location(job.getLocation())
                .recruiterId(u.getId())
                .build();
    }
}
