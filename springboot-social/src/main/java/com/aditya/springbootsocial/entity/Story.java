package com.aditya.springbootsocial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "stories")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private User user;
    private String imageUrl;
    private String caption;
    private LocalDateTime timestamp;
}
