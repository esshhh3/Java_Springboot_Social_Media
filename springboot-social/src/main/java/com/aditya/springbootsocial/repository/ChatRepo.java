package com.aditya.springbootsocial.repository;

import com.aditya.springbootsocial.entity.Chat;
import com.aditya.springbootsocial.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepo extends JpaRepository<Chat,Long> {
    List<Chat> findByUsersId(Long id);
    @Query("select c from chats c where :user member of c.users and :reqUser member of c.users")
    Chat findChatByUsersId(@Param("reqUser") User reqUser,@Param("user") User user);
}
