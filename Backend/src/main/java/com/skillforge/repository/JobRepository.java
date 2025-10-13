package com.skillforge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.model.Job;
import com.skillforge.model.JobStatus;

public interface JobRepository extends JpaRepository<Job, Long>{

List<Job> findByRecruiterId(long userId);
}
