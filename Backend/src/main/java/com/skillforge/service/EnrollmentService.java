package com.skillforge.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillforge.dto.EnrollmentDto;
import com.skillforge.model.Course;
import com.skillforge.model.Enrollment;
import com.skillforge.model.User;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.EnrollmentRepository;
import com.skillforge.repository.UserRepository;

@Service
public class EnrollmentService {
	
	@Autowired
	EnrollmentRepository repo;
	
	@Autowired
	UserRepository urepo;
	
	@Autowired
	CourseRepository crepo;
	
	public Enrollment enroll(long userId, long courseId) {
	    User user = urepo.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Course course = crepo.findById(courseId)
	            .orElseThrow(() -> new RuntimeException("Course not found"));

	    Enrollment enrollment = new Enrollment();
	    enrollment.setUser(user);
	    enrollment.setCourse(course);
	
	    enrollment.setEnrolledAt(LocalDateTime.now());

	    return repo.save(enrollment);
	}

	public boolean isEnrolled(long userId , long courseId) {
		return repo.findByUserIdAndCourseId(userId, courseId).isPresent();
	}
	
	public EnrollmentDto toDTO(Enrollment e) {
        return new EnrollmentDto(
                e.getId(),
                e.getUser().getId(),
                e.getUser().getName(),   // User entity me "name" field hona chahiye
                e.getCourse().getId(),
                e.getCourse().getTitle(), // Course entity me "title" field hona chahiye
                e.getEnrolledAt()
        );
    }
	

}
