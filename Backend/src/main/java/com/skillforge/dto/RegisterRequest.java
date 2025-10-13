package com.skillforge.dto;

import com.skillforge.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank @Size(min = 2)
    private String name;
    @Email @NotBlank
    private String email;
    @NotBlank @Size(min = 6)
    private String password;
    private Role role; // STUDENT/INSTRUCTOR/RECRUITER/ADMIN

    // getters/setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
