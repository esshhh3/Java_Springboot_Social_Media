package com.example.social_media.service;

import com.example.social_media.dto.UserDto;
import com.example.social_media.entity.User;
import com.example.social_media.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setBio(userDto.getBio());
        user.setProfilePicture(userDto.getProfilePicture());
        user.setCoverPhoto(userDto.getCoverPhoto());

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    public void followUser(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId)
            .orElseThrow(() -> new RuntimeException("Follower not found"));
        User following = userRepository.findById(followingId)
            .orElseThrow(() -> new RuntimeException("User to follow not found"));

        follower.getFollowing().add(following);
        userRepository.save(follower);
    }

    public void unfollowUser(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId)
            .orElseThrow(() -> new RuntimeException("Follower not found"));
        User following = userRepository.findById(followingId)
            .orElseThrow(() -> new RuntimeException("User to unfollow not found"));

        follower.getFollowing().remove(following);
        userRepository.save(follower);
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setBio(user.getBio());
        dto.setProfilePicture(user.getProfilePicture());
        dto.setCoverPhoto(user.getCoverPhoto());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setFollowersCount(user.getFollowers().size());
        dto.setFollowingCount(user.getFollowing().size());
        return dto;
    }
} 