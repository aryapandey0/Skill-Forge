package com.skillforge.controller;

import java.util.Map;

import org.apache.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillforge.model.User;
import com.skillforge.repository.UserRepository;
@RestController
@RequestMapping("/api/users")

public class ProfileController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{id}/upload-avatar")
    
    public ResponseEntity<String> uploadAvatar(@PathVariable Long id, @RequestParam("profilePic") MultipartFile file) {
        try {
            
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String loggedInEmail = authentication.getName(); 

            
            User loggedInUser = userRepository.findByEmail(loggedInEmail)
                    .orElseThrow(() -> new RuntimeException("Logged-in user not found"));

            if (!loggedInUser.getId().equals(id)) {
                return ResponseEntity.status(403).body("You are not allowed to update another user's profile picture.");
            }
            

           
            Map  uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = uploadResult.get("url").toString();

            user.setProfileUrl(imageUrl);
            userRepository.save(user);

            return ResponseEntity.ok("Avatar uploaded successfully: " + imageUrl);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
