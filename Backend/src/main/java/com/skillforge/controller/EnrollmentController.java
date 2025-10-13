package com.skillforge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.EnrollmentDto;
import com.skillforge.model.Enrollment;
import com.skillforge.repository.EnrollmentRepository;
import com.skillforge.service.EnrollmentService;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;
    
    @Autowired
    private EnrollmentRepository repo;

    @PostMapping("/dummy-success")
    public ResponseEntity<String> dummyPayment(@RequestParam long userId,
                                               @RequestParam long courseId) {
    	System.out.println("Dummy success called with userId=" + userId + " courseId=" + courseId);
        
        // check agar already enrolled hai
        if(enrollmentService.isEnrolled(userId, courseId)) {
            return ResponseEntity.badRequest()
                    .body("User already enrolled in this course.");
        }

        // enroll user
        enrollmentService.enroll(userId, courseId);
        return ResponseEntity.ok("Payment successful! User enrolled in course.");
    }
    
    @GetMapping("/user/{userId}")
    public List<EnrollmentDto> getMyCourses(@PathVariable long userId) {
        return repo.findByUserId(userId)
                   .stream()
                   .map(enrollmentService::toDTO)
                   .toList();
    }

    @GetMapping("/course/{courseId}")
    public List<EnrollmentDto> getCourseEnrollments(@PathVariable long courseId) {
        return repo.findByCourseId(courseId)
                   .stream()
                   .map(enrollmentService::toDTO)
                   .toList();
    }
    @GetMapping("/check/{userId}/{courseId}")
    public boolean isEnrolled(@PathVariable long userId , @PathVariable long courseId) {
    	return enrollmentService.isEnrolled(userId, courseId);
    }
}

