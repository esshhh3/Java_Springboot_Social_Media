package com.example.social_media.repository;

import com.example.social_media.entity.Comment;
import com.example.social_media.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByPostOrderByCreatedAtDesc(Post post, Pageable pageable);
    
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post = ?1")
    Long countByPost(Post post);
} 