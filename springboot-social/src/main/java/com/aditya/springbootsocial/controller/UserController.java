package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.services.ServiceInt;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
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

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userServices.createUser(user);
    }

    @PutMapping("{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userServices.editUser(id, user);
    }

    @DeleteMapping("{id}")
    public String deleteUser(@PathVariable Long id) {
        userServices.deleteUser(id);
        return "User deleted successfully";
    }

    @PutMapping("/follow/{id1}/{id2}")
    public User followUser(@PathVariable Long id1, @PathVariable Long id2) throws Exception {
        User user = userServices.followUser(id1, id2);
        return user;
    }

    @GetMapping("/search")
    public List<User> searchUser(@RequestParam("query") String query) {
        return userServices.searchUser(query);
    }

}
