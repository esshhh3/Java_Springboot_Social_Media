package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Reels;
import java.util.List;

public interface ReelsService {
    Reels createReels(Reels reels, Long userId) throws Exception;
    String deleteReels(Long reelsId, Long userId) throws Exception;
    List<Reels> findReelsByUserId(Long userId) throws Exception;
    Reels findReelsById(Long reelsId) throws Exception;
    List<Reels> findAllReels() throws Exception;
    Reels likeReels(Long reelsId, Long userId) throws Exception;
}
