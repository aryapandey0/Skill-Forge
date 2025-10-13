package com.skillforge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long>{
public List<Enrollment> findByUserId(long userId);
public List<Enrollment> findByCourseId(long courseId);

Optional<Enrollment> findByUserIdAndCourseId(long userId, long courseId);


}
