package com.example.social_media.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDto {
    private Long id;
    private UserDto user;
    private String caption;
    private String imageUrl;
    private LocalDateTime createdAt;
    private int likesCount;
    private int commentsCount;
    private boolean isLiked;
    private List<CommentDto> comments;
} 