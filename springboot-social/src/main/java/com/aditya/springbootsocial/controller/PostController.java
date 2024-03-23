package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.entity.Post;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.response.ApiResponse;
import com.aditya.springbootsocial.services.PostService;
import com.aditya.springbootsocial.services.UserServices;
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

    @Autowired
    UserServices userServices;

    @PostMapping()
    public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt,@RequestBody Post post) throws Exception {
        User reqUser = userServices.getUserFromToken(jwt);
        Post createdPost = postService.createPost(post, reqUser.getId());
        return new ResponseEntity<Post>(createdPost, HttpStatus.CREATED);
    }

    @DeleteMapping("{postId}")
    public ResponseEntity<ApiResponse> deletePost(@RequestHeader("Authorization") String jwt,@PathVariable Long postId) throws Exception {
        User reqUser = userServices.getUserFromToken(jwt);
        String message = postService.deletePost(postId, reqUser.getId());
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

    @PutMapping("save/{postId}")
    public ResponseEntity<Post> savePostById(@RequestHeader("Authorization") String jwt,@PathVariable Long postId) throws Exception{
        User reqUser = userServices.getUserFromToken(jwt);
        Post post = postService.savedPost(postId, reqUser.getId());
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PutMapping("like/{postId}")
    public ResponseEntity<Post> likePost(@RequestHeader("Authorization") String jwt ,@PathVariable Long postId) throws Exception{
        User reqUser = userServices.getUserFromToken(jwt);
        Post post = postService.likedPost(postId, reqUser.getId());
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

}
