package com.aditya.springbootsocial.repository;

import com.aditya.springbootsocial.entity.Reels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReelsRepo extends JpaRepository<Reels, Long> {
    @Query("SELECT r FROM reels r WHERE r.user.id = :userId")
    List<Reels> findReelsByUserId(Long userId);
}
