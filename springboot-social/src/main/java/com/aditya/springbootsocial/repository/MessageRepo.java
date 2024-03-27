package com.aditya.springbootsocial.repository;

import com.aditya.springbootsocial.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Long> {
    List<Message>findByChatId(Long chatId);
}
