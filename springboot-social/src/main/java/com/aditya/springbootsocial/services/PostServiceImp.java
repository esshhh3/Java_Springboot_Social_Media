package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Post;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.repository.PostRepo;
import com.aditya.springbootsocial.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImp implements PostService{
    @Autowired
    PostRepo postRepo;
    @Autowired
    ServiceInt userService;
    @Autowired
    UserRepo userRepo;

    @Override
    public Post createPost(Post post, Long userId) throws Exception {
        User user = userService.getUserById(userId);
        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);

        postRepo.save(newPost);
        return newPost;
    }

    @Override
    public String deletePost(Long postId, Long userId) throws Exception {
        Post post = findPostById(postId);
        if(post.getUser().getId().equals(userId)) {
            postRepo.deleteById(postId);
            return "Post deleted successfully";
        }else {
            throw new Exception("You are not authorized to delete this post");
        }
    }

    @Override
    public List<Post> findPostsByUserId(Long userId) throws Exception {
        return postRepo.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Long postId) throws Exception {
        Optional<Post> post = postRepo.findById(postId);
        if(post.isPresent()){
            return post.get();
        }else{
            throw new Exception("Post not found");
        }
    }

    @Override
    public List<Post> findAllPosts() throws Exception {
        return postRepo.findAll();
    }

    @Override
    public Post savedPost(Long postId, Long userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.getUserById(userId);
        if (user.getSavedPosts().contains(post)){
            user.getSavedPosts().remove(post);
            userRepo.save(user);
        }else{
            user.getSavedPosts().add(post);
            userRepo.save(user);
        }
        return post;
    }

    @Override
    public Post likedPost(Long postId, Long userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.getUserById(userId);

        if(post.getLikedBy().contains(user)){
            post.getLikedBy().remove(user);
            postRepo.save(post);
        }else{
            post.getLikedBy().add(user);
            postRepo.save(post);
        }
        return post;
    }
}
