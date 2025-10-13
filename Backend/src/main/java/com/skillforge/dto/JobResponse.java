package com.skillforge.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobResponse {

private long id;
private String title;
private String description;
private String company;
private String location;
private long recruiterId;
}
