package com.aditya.springbootsocial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "first_name")
    private String fname;
    @Column(name = "last_name")
    private String lname;
    private String email;
    private String password;
    private String gender;

    private List<Long> following = new ArrayList<>();
    private List<Long> followers = new ArrayList<>();
    @ManyToMany // Many users can save many posts
    private List<Post> savedPosts = new ArrayList<>();

}
