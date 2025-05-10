package com.example.social_media.repository;

import com.example.social_media.entity.Reel;
import com.example.social_media.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReelRepository extends JpaRepository<Reel, Long> {
    List<Reel> findByUser(User user);
} 