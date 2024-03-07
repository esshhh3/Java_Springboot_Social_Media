package com.aditya.springbootsocial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
    private Long id;
    private String caption;
    private String  image;
    private String video;
    @ManyToOne
    private User user;
    @OneToMany
    private List<User> likedBy = new ArrayList<>();
    private LocalDateTime createdAt;
}
