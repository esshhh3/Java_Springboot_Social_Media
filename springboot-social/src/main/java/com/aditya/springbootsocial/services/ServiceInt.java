package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.exception.UserException;

import java.util.List;

public interface ServiceInt {
    User createUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    User editUser(Long id, User user);
    void deleteUser(Long id);
    User followUser(Long id1, Long id2) throws UserException;
    User findUserByEmail(String email);
    List<User> searchUser(String query);
    User getUserFromToken(String jwt);
}
