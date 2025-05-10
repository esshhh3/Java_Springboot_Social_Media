package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.entity.Reels;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.response.ApiResponse;
import com.aditya.springbootsocial.services.ReelsService;
import com.aditya.springbootsocial.services.UserServices;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reels")
public class ReelsController {
    @Autowired
    private ReelsService reelsService;

    @Autowired
    private UserServices userServices;

    @PostMapping()
    public ResponseEntity<Reels> createReels(@RequestHeader("Authorization") String jwt, @RequestBody Reels reels) throws Exception {
        User reqUser = userServices.getUserFromToken(jwt);
        Reels createdReels = reelsService.createReels(reels, reqUser.getId());
        return new ResponseEntity<>(createdReels, HttpStatus.CREATED);
    }

    @DeleteMapping("{reelsId}")
    public ResponseEntity<ApiResponse> deleteReels(@RequestHeader("Authorization") String jwt, @PathVariable Long reelsId) throws Exception {
        User reqUser = userServices.getUserFromToken(jwt);
        String message = reelsService.deleteReels(reelsId, reqUser.getId());
        ApiResponse response = new ApiResponse(message, true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("{reelsId}")
    public ResponseEntity<Reels> findReelsById(@PathVariable Long reelsId) throws Exception {
        Reels reels = reelsService.findReelsById(reelsId);
        return new ResponseEntity<>(reels, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<Reels>> findReelsByUserId(@PathVariable Long userId) throws Exception {
        List<Reels> reels = reelsService.findReelsByUserId(userId);
        return new ResponseEntity<>(reels, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Reels>> findAllReels() throws Exception {
        List<Reels> reels = reelsService.findAllReels();
        return new ResponseEntity<>(reels, HttpStatus.OK);
    }

    @PutMapping("like/{reelsId}")
    public ResponseEntity<Reels> likeReels(@RequestHeader("Authorization") String jwt, @PathVariable Long reelsId) throws Exception {
        User reqUser = userServices.getUserFromToken(jwt);
        Reels reels = reelsService.likeReels(reelsId, reqUser.getId());
        return new ResponseEntity<>(reels, HttpStatus.OK);
    }
}
