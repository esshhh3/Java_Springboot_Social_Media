package com.example.social_media.service;

import com.example.social_media.dto.StoryDto;
import com.example.social_media.entity.Story;
import com.example.social_media.entity.User;
import com.example.social_media.repository.StoryRepository;
import com.example.social_media.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StoryService {
    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public StoryDto createStory(Long userId, String mediaUrl) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Story story = new Story();
        story.setUser(user);
        story.setMediaUrl(mediaUrl);

        Story savedStory = storyRepository.save(story);
        return convertToDto(savedStory);
    }

    public List<StoryDto> getUserStories(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime dayAgo = LocalDateTime.now().minusHours(24);
        return storyRepository.findByUserAndCreatedAtAfterOrderByCreatedAtDesc(user, dayAgo)
            .stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public List<StoryDto> getFeedStories(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime dayAgo = LocalDateTime.now().minusHours(24);
        return storyRepository.findStoriesForUser(user, dayAgo)
            .stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Scheduled(cron = "0 0 * * * *") // Run every hour
    public void deleteExpiredStories() {
        storyRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }

    private StoryDto convertToDto(Story story) {
        StoryDto dto = new StoryDto();
        dto.setId(story.getId());
        dto.setUser(userService.getUserByUsername(story.getUser().getUsername()));
        dto.setMediaUrl(story.getMediaUrl());
        dto.setCreatedAt(story.getCreatedAt());
        dto.setExpiresAt(story.getExpiresAt());
        return dto;
    }
} 