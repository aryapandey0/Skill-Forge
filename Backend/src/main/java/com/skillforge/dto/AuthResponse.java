package com.skillforge.dto;

import com.skillforge.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String profilePic;
    private Role role;
    private long id;

    
  
}
