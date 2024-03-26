package com.aditya.springbootsocial.repository;

import com.aditya.springbootsocial.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepo extends JpaRepository<Story, Long>{
    List<Story> findByUserId(Long userId);
}
