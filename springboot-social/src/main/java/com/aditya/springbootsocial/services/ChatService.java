package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Chat;
import com.aditya.springbootsocial.entity.User;

import java.util.List;

public interface ChatService {
    Chat createChat(User reqUser, User user2);
    Chat getChatById(Long chatId) throws Exception;
    List<Chat> getChatsByUserId(Long userId);
}
