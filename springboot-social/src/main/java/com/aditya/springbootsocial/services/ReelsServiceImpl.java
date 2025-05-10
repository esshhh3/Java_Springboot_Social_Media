package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Reels;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.repository.ReelsRepo;
import com.aditya.springbootsocial.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReelsServiceImpl implements ReelsService {
    @Autowired
    private ReelsRepo reelsRepo;
    
    @Autowired
    private ServiceInt userService;
    
    @Autowired
    private UserRepo userRepo;

    @Override
    public Reels createReels(Reels reels, Long userId) throws Exception {
        User user = userService.getUserById(userId);
        Reels newReels = new Reels();
        newReels.setTitle(reels.getTitle());
        newReels.setVideo(reels.getVideo());
        newReels.setCaption(reels.getCaption());
        newReels.setUser(user);

        reelsRepo.save(newReels);
        return newReels;
    }

    @Override
    public String deleteReels(Long reelsId, Long userId) throws Exception {
        Reels reels = findReelsById(reelsId);
        if(reels.getUser().getId().equals(userId)) {
            reelsRepo.deleteById(reelsId);
            return "Reels deleted successfully";
        } else {
            throw new Exception("You are not authorized to delete this reels");
        }
    }

    @Override
    public List<Reels> findReelsByUserId(Long userId) throws Exception {
        return reelsRepo.findReelsByUserId(userId);
    }

    @Override
    public Reels findReelsById(Long reelsId) throws Exception {
        Optional<Reels> reels = reelsRepo.findById(reelsId);
        if(reels.isPresent()) {
            return reels.get();
        } else {
            throw new Exception("Reels not found");
        }
    }

    @Override
    public List<Reels> findAllReels() throws Exception {
        return reelsRepo.findAll();
    }

    @Override
    public Reels likeReels(Long reelsId, Long userId) throws Exception {
        Reels reels = findReelsById(reelsId);
        User user = userService.getUserById(userId);

        if(reels.getLikedBy().contains(user)) {
            reels.getLikedBy().remove(user);
        } else {
            reels.getLikedBy().add(user);
        }
        return reelsRepo.save(reels);
    }
}
