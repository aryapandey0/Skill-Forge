package com.skillforge.dto;

import lombok.Data;

@Data
public class JobApplicationRequestDTO {
    private long applicantId;
    private long recruiterId;
    private String coverLetter;
}
