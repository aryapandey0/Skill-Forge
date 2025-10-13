package com.skillforge.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillforge.model.Course;
import com.skillforge.model.User;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.UserRepository;

@Service
public class CourseService {

	private UserRepository userrepo;
	private CourseRepository crepo;
    private final Cloudinary cloudinary;
    
	public CourseService(UserRepository userrepo , CourseRepository crepo,Cloudinary c) {
		this.crepo=crepo;
		this.userrepo=userrepo;
		cloudinary = c;
	}
	
	
	public Course	 createCourse(Course course) {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User u = userrepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));
		
		course.setInstructor(u);
		return crepo.save(course);
	}
	
	 public List<Course> getAllCourses() {
	        return crepo.findAll();
	    }

	    public List<Course> getCoursesByInstructor(Long instructorId) {
	        return crepo.findByInstructorId(instructorId);
	    }

	    public Course getCourseById(Long id) {
	        return crepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Course not found"));
	    }
	    public Course updateCourse(Long id, Course updatedCourse) {
	        Course course = getCourseById(id);
	        course.setTitle(updatedCourse.getTitle());
	        course.setDescription(updatedCourse.getDescription());
	        course.setPrice(updatedCourse.getPrice());
	        course.setDifficultyLevel(updatedCourse.getDifficultyLevel());
	        course.setCategory(updatedCourse.getCategory());
	        course.setThumbnailUrl(updatedCourse.getThumbnailUrl());
	        return crepo.save(course);
	    }

	    public void deleteCourse(Long id) {
	        crepo.deleteById(id);
	    }
	    
	    public String uploadThumbnail(long courseId, MultipartFile thumbnail) throws IOException {
	    	Course c = crepo.findById(courseId).orElseThrow(()->new RuntimeException("Course Not Found"));
	    	
	    	String email = SecurityContextHolder.getContext().getAuthentication().getName();
	    	User u = userrepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));
	    	
	    	if(!c.getInstructor().getId().equals(u.getId())){
	    		   throw new RuntimeException("You are not allowed to update this course thumbnail.");
	    	}
	    	
	    	Map uploadResult = cloudinary.uploader().upload(thumbnail.getBytes(), ObjectUtils.emptyMap());
	    	   String imageUrl = uploadResult.get("url").toString();
	    	   
	    	   c.setThumbnailUrl(imageUrl);
	            crepo.save(c);

	            return imageUrl;
	    }
	
	
	
}
