package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Chat;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.exception.ChatException;

import java.util.List;

public interface ChatService {
    Chat createChat(User reqUser, User user2);
    Chat getChatById(Long chatId) throws ChatException;
    List<Chat> getChatsByUserId(Long userId);
}
