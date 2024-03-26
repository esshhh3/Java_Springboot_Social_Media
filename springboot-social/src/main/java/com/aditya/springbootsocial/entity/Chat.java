package com.aditya.springbootsocial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "chats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String chat_name;
    private String chat_image;
    // each chat can have multiple users and each user can be in multiple chats
    @ManyToMany
    private List<User> users = new ArrayList<>();
    @OneToMany(mappedBy = "chat")
    private List<Message> messages = new ArrayList<>();
    private LocalDateTime timestamp;
}
