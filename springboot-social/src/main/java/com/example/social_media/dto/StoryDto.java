package com.example.social_media.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StoryDto {
    private Long id;
    private UserDto user;
    private String mediaUrl;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
} 