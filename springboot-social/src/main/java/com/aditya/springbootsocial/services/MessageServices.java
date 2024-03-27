package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Message;
import com.aditya.springbootsocial.entity.User;

import java.util.List;

public interface MessageServices {
    Message createMessage(User reqUser, Long chatId, Message req) throws Exception;
    List<Message> findChatsMessages(Long chatId) throws Exception;
}
