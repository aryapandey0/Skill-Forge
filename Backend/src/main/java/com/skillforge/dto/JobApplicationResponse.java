package com.skillforge.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class JobApplicationResponse {
    private long id;
    private String resume;
    private String coverLetter;
    private String status;
    private LocalDateTime createdAt;
    private String applicantName;
    private String applicantEmail;
}
