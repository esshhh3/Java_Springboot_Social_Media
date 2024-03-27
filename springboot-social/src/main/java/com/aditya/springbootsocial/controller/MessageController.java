package com.aditya.springbootsocial.controller;

import com.aditya.springbootsocial.entity.Message;
import com.aditya.springbootsocial.entity.User;
import com.aditya.springbootsocial.services.MessageServices;
import com.aditya.springbootsocial.services.ServiceInt;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@Data
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageServices messageService;
    @Autowired
    private ServiceInt userService;

    @PostMapping("/chat/{chatId}")
    public Message createMessage(@RequestHeader("Authorization") String token, @PathVariable Long chatId, @RequestBody Message req) throws Exception {
        User reqUser = userService.getUserFromToken(token);
        return messageService.createMessage(reqUser, chatId, req);
    }

    @GetMapping("/chat/{chatId}")
    public List<Message> getChatMessages(@PathVariable Long chatId) throws Exception {
        return messageService.findChatsMessages(chatId);
    }
}
