package com.example.social_media.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private UserDto user;
    private String content;
    private LocalDateTime createdAt;
} 