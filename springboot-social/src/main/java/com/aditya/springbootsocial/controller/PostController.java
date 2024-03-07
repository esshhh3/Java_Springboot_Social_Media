package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.entity.Post;
import com.aditya.springbootsocial.response.ApiResponse;
import com.aditya.springbootsocial.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    PostService postService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<Post> createPost(@RequestBody Post post, @PathVariable Long userId) throws Exception {
        Post createdPost = postService.createPost(post, userId);
        return new ResponseEntity<Post>(createdPost, HttpStatus.CREATED);
    }

    @DeleteMapping("{postId}/user/{userId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId, @PathVariable Long userId) throws Exception {
        String message = postService.deletePost(postId, userId);
        ApiResponse response = new ApiResponse(message, true);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
    }

    @GetMapping("{postId}")
    public ResponseEntity<Post> findPostById(@PathVariable Long postId) throws Exception {
        Post post = postService.findPostById(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<Post>> findPostsByUserId(@PathVariable Long userId) throws Exception {
        List<Post> posts = postService.findPostsByUserId(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Post>> findAllPosts() throws Exception {
        List<Post> posts = postService.findAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("save/{postId}/user/{userId}")
    public ResponseEntity<Post> savePostById(@PathVariable Long postId, @PathVariable Long userId) throws Exception{
        Post post = postService.savedPost(postId, userId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PutMapping("like/{postId}/user/{userId}")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, @PathVariable Long userId) throws Exception{
        Post post = postService.likedPost(postId, userId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

}
