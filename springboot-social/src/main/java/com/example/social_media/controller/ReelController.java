package com.example.social_media.controller;

import com.example.social_media.entity.Reel;
import com.example.social_media.service.ReelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reels")
public class ReelController {

    @Autowired
    private ReelService reelService;

    @PostMapping
    public Reel createReel(@RequestBody Reel reel, @RequestParam Long userId) {
        return reelService.createReel(reel, userId);
    }

    @GetMapping
    public List<Reel> getAllReels() {
        return reelService.getAllReels();
    }

    @GetMapping("/user/{userId}")
    public List<Reel> getReelsByUser(@PathVariable Long userId) {
        return reelService.getReelsByUser(userId);
    }

    @PutMapping("/like/{reelId}")
    public Reel likeReel(@PathVariable Long reelId, @RequestParam Long userId) {
        return reelService.likeReel(reelId, userId);
    }

    @DeleteMapping("/{reelId}")
    public void deleteReel(@PathVariable Long reelId, @RequestParam Long userId) {
        reelService.deleteReel(reelId, userId);
    }
} 