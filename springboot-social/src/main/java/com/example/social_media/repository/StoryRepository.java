package com.example.social_media.repository;

import com.example.social_media.entity.Story;
import com.example.social_media.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findByUserAndCreatedAtAfterOrderByCreatedAtDesc(User user, LocalDateTime time);
    
    @Query("SELECT s FROM Story s WHERE s.user IN (SELECT f FROM User u JOIN u.following f WHERE u = ?1) AND s.createdAt > ?2 ORDER BY s.createdAt DESC")
    List<Story> findStoriesForUser(User user, LocalDateTime time);
    
    void deleteByExpiresAtBefore(LocalDateTime time);
} 