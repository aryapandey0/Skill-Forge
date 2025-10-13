package com.skillforge.service;

import com.skillforge.model.Role;
import com.skillforge.model.User;
import com.skillforge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        if(user.getEmail().equals("admin@gmail.com"))user.setRole(Role.ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
