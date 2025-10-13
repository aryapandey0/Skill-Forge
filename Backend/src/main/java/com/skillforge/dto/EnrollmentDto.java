package com.skillforge.dto;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDto {
    private long enrollmentId;
    private long userId;
    private String userName;
    private long courseId;
    private String courseTitle;
    private LocalDateTime enrolledAt;
}
