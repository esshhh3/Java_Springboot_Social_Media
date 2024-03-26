package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Story;
import com.aditya.springbootsocial.entity.User;

import java.util.List;

public interface StoryService {
    Story createStory(Story story, User user);
    List<Story> findStoriesByUserId(Long userId);
}
