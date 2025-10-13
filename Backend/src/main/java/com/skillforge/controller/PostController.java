package com.skillforge.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillforge.dto.PostDTO;
import com.skillforge.model.Post;
import com.skillforge.model.User;
import com.skillforge.repository.PostRepository;
import com.skillforge.repository.UserRepository;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository repo;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private UserRepository urepo;

    // ✅ Create Post
    @PostMapping("/create/{userId}")
    public ResponseEntity<PostDTO> createPost(
            @PathVariable long userId,
            @RequestParam("caption") String caption,
            @RequestParam("image") MultipartFile file) throws Exception {

        User u = urepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String imageUrl = "";
        if (file != null && !file.isEmpty()) {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("folder", "skillforge/posts")
            );
            imageUrl = uploadResult.get("secure_url").toString();
        }

        Post post = new Post();
        post.setUser(u);
        post.setImage(imageUrl);
        post.setCaption(caption);
        post.setCreatedAt(LocalDateTime.now()); // ✅ missing semicolon fix

        Post saved = repo.save(post);

        PostDTO response = new PostDTO(
                saved.getId(),
                saved.getImage(),
                saved.getCaption(),
                u.getName(),
                saved.getCreatedAt(),
                u.getProfileUrl(),
                u.getId()
        );

        return ResponseEntity.ok(response);
    }

    // ✅ Get All Posts (latest first)
    @GetMapping("/all")
    public List<PostDTO> getAllPosts() {
        return repo.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(p -> new PostDTO(
                        p.getId(),
                        p.getImage(),
                        p.getCaption(),
                        p.getUser().getName(),
                        p.getCreatedAt(),
                        p.getUser().getProfileUrl(),
                        p.getUser().getId()
                       
                ))
                .toList();
    }

    // ✅ Get Posts of Specific User
    @GetMapping("/{userId}")
    public List<PostDTO> getMyPosts(@PathVariable long userId) {
        return repo.findByUserId(userId)
                .stream()
                .map(p -> new PostDTO(
                        p.getId(),
                        p.getImage(),
                        p.getCaption(),
                        p.getUser().getName(),
                        p.getCreatedAt(),
                        p.getUser().getProfileUrl(),
                        p.getUser().getId()
                ))
                .toList();
    }
}
