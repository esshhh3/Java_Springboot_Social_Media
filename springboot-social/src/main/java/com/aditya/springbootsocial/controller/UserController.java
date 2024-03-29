package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.exception.UserException;
import com.aditya.springbootsocial.services.ServiceInt;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    ServiceInt userServices;

    @GetMapping()
    public List<User> getUsers() {
        return userServices.getAllUsers();
    }

    @GetMapping("api/users/{id}")
    public User getUserById(@PathVariable("id") Long userId) {
        return userServices.getUserById(userId);
    }

    @PutMapping()
    public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) {
        User reqUser = userServices.getUserFromToken(jwt);
        return userServices.editUser(reqUser.getId(), user);
    }

    @DeleteMapping("{id}")
    public String deleteUser(@PathVariable Long id) {
        userServices.deleteUser(id);
        return "User deleted successfully";
    }

    @PutMapping("/follow/{id2}")
    public User followUser(@RequestHeader("Authorization") String jwt, @PathVariable Long id2) throws UserException {
        User reqUser = userServices.getUserFromToken(jwt);
        return userServices.followUser(reqUser.getId(), id2);
    }

    @GetMapping("/search")
    public List<User> searchUser(@RequestParam("query") String query) {
        return userServices.searchUser(query);
    }

    @GetMapping("/profile")  // access the token from the frontend request authorization header
    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {

        User user = userServices.getUserFromToken(jwt);
        user.setPassword(null);
        return user;
    }
}
