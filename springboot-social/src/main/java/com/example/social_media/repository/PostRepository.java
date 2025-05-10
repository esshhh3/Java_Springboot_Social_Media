package com.example.social_media.repository;

import com.example.social_media.entity.Post;
import com.example.social_media.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    
    @Query("SELECT p FROM Post p WHERE p.user IN (SELECT f FROM User u JOIN u.following f WHERE u = ?1) ORDER BY p.createdAt DESC")
    Page<Post> findFeedForUser(User user, Pageable pageable);
    
    @Query("SELECT COUNT(p) FROM Post p WHERE p.user = ?1")
    Long countByUser(User user);
} 