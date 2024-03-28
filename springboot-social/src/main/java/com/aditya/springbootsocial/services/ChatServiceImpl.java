package com.aditya.springbootsocial.services;

import com.aditya.springbootsocial.entity.Chat;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.exception.ChatException;
import com.aditya.springbootsocial.repository.ChatRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService{
    @Autowired
    private ChatRepo chatRepo;
    @Override
    public Chat createChat(User reqUser, User user2) {
        Chat isExisting = chatRepo.findChatByUsersId(reqUser, user2);
        if(isExisting != null)
            return isExisting;

        Chat chat = new Chat();
        chat.getUsers().add(user2);
        chat.getUsers().add(reqUser);
        chat.setTimestamp(LocalDateTime.now());

        return chatRepo.save(chat);
    }

    @Override
    public Chat getChatById(Long chatId) throws ChatException {
        Optional<Chat> chatOptional = chatRepo.findById(chatId);
        if(chatOptional.isPresent())
            return chatOptional.get();
        else
            throw new ChatException("Chat not found it with id "+chatId);
    }

    @Override
    public List<Chat> getChatsByUserId(Long userId) {
        return chatRepo.findByUsersId(userId);
    }
}
