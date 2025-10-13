package com.skillforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillforge.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{
public List<Post> findByUserId(long userId);
List<Post> findAllByOrderByCreatedAtDesc(); 
}
