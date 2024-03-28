package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.config.JwtProvider;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.exception.UserException;
import com.aditya.springbootsocial.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServices implements ServiceInt{
    @Autowired
    UserRepo userRepo;

    @Override
    public User createUser(User user){
        Optional<User> userOptional = userRepo.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()){
            throw new IllegalStateException("email is already present");
        }
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers(){
        List<User> users = userRepo.findAll();
        return users;
    }

    @Override
    public User getUserById(Long id){
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isPresent()){
            return userOptional.get();
        }else {
            throw new IllegalStateException("User Id "+id+" does not exist");
        }
    }

    @Override
    public User editUser(Long id, User user){
        User existingUser = userRepo.findById(id).orElseThrow(()-> new IllegalStateException("User id not found"));

        if(user.getFname() != null)
            existingUser.setFname(user.getFname());
        if(user.getLname() != null)
            existingUser.setLname(user.getLname());
        if(user.getEmail() != null)
            existingUser.setEmail(user.getEmail());
        if(user.getPassword() != null)
            existingUser.setPassword(user.getPassword());
        if(user.getGender() != null)
            existingUser.setGender(user.getGender());

        userRepo.save(existingUser);

        return existingUser;
    }

    @Override
    public void deleteUser(Long id){
        Optional<User> userOptional = Optional.ofNullable(userRepo.findById(id).orElseThrow(() -> new IllegalStateException("User id not found")));

        if (userOptional.isPresent()){
            User user = userOptional.get();
            userRepo.delete(user);
        }
    }

    @Override
    public User followUser(Long reqUserId, Long id2) throws UserException {
        User reqUser = getUserById(reqUserId);
        User user2 = getUserById(id2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowing().add(user2.getId());

        userRepo.save(reqUser);
        userRepo.save(user2);

        return reqUser;
    }

    @Override
    public User findUserByEmail(String email) {
        Optional<User> userOptional = userRepo.findUserByEmail(email);
        if (userOptional.isPresent()){
            return userOptional.get();
        }else {
            throw new IllegalStateException("email id not found");
        }
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepo.searchUser(query);
    }

    @Override
    public User getUserFromToken(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
        return user;
    }


}
