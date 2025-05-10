package com.example.social_media.service;

import com.example.social_media.entity.Reel;
import com.example.social_media.entity.User;
import com.example.social_media.repository.ReelRepository;
import com.example.social_media.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelService {

    @Autowired
    private ReelRepository reelRepository;

    @Autowired
    private UserRepository userRepository;

    public Reel createReel(Reel reel, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        reel.setUser(user);
        return reelRepository.save(reel);
    }

    public List<Reel> getAllReels() {
        return reelRepository.findAll();
    }

    public List<Reel> getReelsByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return reelRepository.findByUser(user);
    }

    public Reel likeReel(Long reelId, Long userId) {
        Reel reel = reelRepository.findById(reelId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        if (reel.getLikedBy().contains(user)) {
            reel.getLikedBy().remove(user);
        } else {
            reel.getLikedBy().add(user);
        }
        return reelRepository.save(reel);
    }

    public void deleteReel(Long reelId, Long userId) {
        Reel reel = reelRepository.findById(reelId).orElseThrow();
        if (reel.getUser().getId().equals(userId)) {
            reelRepository.delete(reel);
        } else {
            throw new RuntimeException("You can only delete your own reels.");
        }
    }
} 