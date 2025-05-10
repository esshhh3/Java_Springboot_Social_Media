package com.example.social_media.service;

import com.example.social_media.dto.PostDto;
import com.example.social_media.entity.Post;
import com.example.social_media.entity.User;
import com.example.social_media.repository.PostRepository;
import com.example.social_media.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public PostDto createPost(Long userId, String caption, String imageUrl) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setUser(user);
        post.setCaption(caption);
        post.setImageUrl(imageUrl);

        Post savedPost = postRepository.save(post);
        return convertToDto(savedPost, user);
    }

    public Page<PostDto> getUserFeed(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepository.findFeedForUser(user, pageable)
            .map(post -> convertToDto(post, user));
    }

    public Page<PostDto> getUserPosts(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepository.findByUserOrderByCreatedAtDesc(user, pageable)
            .map(post -> convertToDto(post, user));
    }

    public void likePost(Long userId, Long postId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        post.getLikedBy().add(user);
        postRepository.save(post);
    }

    public void unlikePost(Long userId, Long postId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        post.getLikedBy().remove(user);
        postRepository.save(post);
    }

    private PostDto convertToDto(Post post, User currentUser) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setUser(userService.getUserByUsername(post.getUser().getUsername()));
        dto.setCaption(post.getCaption());
        dto.setImageUrl(post.getImageUrl());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setLikesCount(post.getLikedBy().size());
        dto.setCommentsCount(post.getComments().size());
        dto.setLiked(post.getLikedBy().contains(currentUser));
        return dto;
    }
} 