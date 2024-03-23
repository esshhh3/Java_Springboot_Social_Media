package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Comment;
import com.aditya.springbootsocial.entity.Post;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.repository.CommentRepo;
import com.aditya.springbootsocial.repository.PostRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentServices{

    @Autowired
    private PostService postService;
    @Autowired
    private ServiceInt userService;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private PostRepo postRepo;

    @Override
    public Comment createComment(Comment comment, Long postId, Long userId) throws Exception {
        User user = userService.getUserById(userId);
        Post post = postService.findPostById(postId);
        comment.setUser(user);

        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        commentRepo.save(comment);
        post.getComments().add(comment);
        postRepo.save(post);

        return comment;
    }

    @Override
    public Comment likeComment(Long commentId, Long userId) throws Exception {
        Comment comment = findCommentById(commentId);
        User user = userService.getUserById(userId);
        if(comment.getLikedBy().contains(user)) {
            comment.getLikedBy().remove(user);
        }else {
            comment.getLikedBy().add(user);
        }
        return commentRepo.save(comment);
    }

    @Override
    public Comment findCommentById(Long commentId) throws Exception {
        Optional<Comment> commentOptional = commentRepo.findById(commentId);
        if (commentOptional.isEmpty()){
            throw new Exception("No comment found with id: " + commentId);
        }
        return commentOptional.get();
    }
}
