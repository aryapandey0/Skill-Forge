package com.skillforge.controller;

import com.skillforge.model.Course;
import com.skillforge.repository.CourseRepository;
import com.skillforge.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    
    @Autowired
    CourseRepository repo;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.createCourse(course));
    }

    
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    // Update course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return ResponseEntity.ok(courseService.updateCourse(id, course));
    }

    // Delete course
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted successfully");
    }
    @PostMapping("/upload-thumbnail/{courseId}")
    public String uploadThumbnail(@PathVariable long courseId,@RequestParam("thumbnail") MultipartFile image) throws IOException {
    	return courseService.uploadThumbnail(courseId, image) + "Successfully Uploaded image";
    }
    
    @GetMapping("/search")
    public List<Course> getSearchResults(@RequestParam String title){
    	return repo.findByTitleContainingIgnoreCase(title);
    }
    
    @GetMapping("/instructor/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable long instructorId){
    	return repo.findByInstructorId(instructorId);
    }
    
}
