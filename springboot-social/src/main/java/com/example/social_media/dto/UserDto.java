package com.example.social_media.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String bio;
    private String profilePicture;
    private String coverPhoto;
    private LocalDateTime createdAt;
    private int followersCount;
    private int followingCount;
    private int postsCount;
    private boolean isFollowing;
} 