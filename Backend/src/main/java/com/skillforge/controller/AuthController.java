package com.skillforge.controller;

import com.skillforge.dto.AuthRequest;
import com.skillforge.dto.AuthResponse;
import com.skillforge.dto.AuthResponse.AuthResponseBuilder;
import com.skillforge.dto.RegisterRequest;
import com.skillforge.model.Role;
import com.skillforge.model.User;
import com.skillforge.repository.UserRepository;
import com.skillforge.config.JwtUtil;
import com.skillforge.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor

public class AuthController {
	
	@Autowired
	UserRepository repo;

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword()) // will be encoded in service
                .role(req.getRole() != null ? req.getRole() : Role.STUDENT)
                .build();
        User saved = userService.registerUser(user);
        return ResponseEntity.ok(Map.of(
                "id", saved.getId(),
                "email", saved.getEmail(),
                "role", saved.getRole().name()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        String token = jwtUtil.generateToken(
                ((UserDetails) auth.getPrincipal()).getUsername(),
                Map.of("role", auth.getAuthorities().iterator().next().getAuthority())
        );
        User u = repo.findByEmail(req.getEmail()).get();
        
        AuthResponse response = AuthResponse.builder()
        		.email(req.getEmail()).token(token).name(u.getName()).id(u.getId()).profilePic(u.getProfileUrl()).role(u.getRole()).build();
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
    
    @GetMapping("/all")
    public List<User> getAll(){
    	return repo.findAll();
    }
    
    @GetMapping("/{userId}")
    public User getUser(@PathVariable long userId) {
    	return repo.findById(userId).orElse(null);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/changeRole/{userId}")
    public ResponseEntity<?> changeRole(@PathVariable long userId,@RequestBody Role role){
    	User u = repo.findById(userId).get();
    	u.setRole(role);
    	
    	repo.save(u);
    	return ResponseEntity.ok("user updated");
    	
    }
    
    
    
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable long userId){
    	User u = repo.findById(userId).get();
    	repo.delete(u);
    	return ResponseEntity.ok("Deleted ");
    }
    
    @GetMapping("/students")
    public List<User> getAllStudents(){
    	return repo.findByRole(Role.STUDENT);
    }
    
    @PutMapping("/change-name/{userId}")
    public String changeName(@PathVariable long userId , @RequestBody Map<String, String> body) {
    	User u = repo.findById(userId).get();
    	String cleanName = body.get("name"); 
    	u.setName(cleanName);
    	repo.save(u);
    	return "Saved Successfully";
    }
}
