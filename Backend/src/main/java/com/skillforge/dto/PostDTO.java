package com.skillforge.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostDTO {
    private long postId;
    private String image;
    private String caption;
    private String userName;
    private LocalDateTime createdAt;
    private String profile;
    private long userId;
}
