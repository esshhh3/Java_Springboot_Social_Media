package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Reels;
import com.aditya.springbootsocial.entity.User;

import java.util.List;

public interface ReelsService {
    Reels createReel(Reels reels, User user);
    List<Reels> findAllReels();
    List<Reels> findReelsByUserId(Long userId);
}
