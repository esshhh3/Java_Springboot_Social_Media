package com.aditya.springbootsocial.repository;

import com.aditya.springbootsocial.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepo extends JpaRepository<Post,Long> {
    @Query("SELECT p FROM posts p WHERE p.user.id = :userId")
    List<Post> findPostByUserId(Long userId);
}
