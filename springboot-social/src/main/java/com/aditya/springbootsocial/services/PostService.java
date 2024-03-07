package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Post;

import java.util.List;


public interface PostService {
    Post createPost(Post post, Long userId) throws Exception;
    String deletePost(Long postId, Long userId) throws Exception;
    List<Post> findPostsByUserId(Long userId) throws Exception;
    Post findPostById(Long postId) throws Exception;
    List<Post> findAllPosts() throws Exception;
    Post savedPost(Long postId, Long userId) throws Exception;
    Post likedPost(Long postId, Long userId) throws Exception;
}
