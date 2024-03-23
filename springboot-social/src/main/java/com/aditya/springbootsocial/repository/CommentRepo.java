package com.aditya.springbootsocial.repository;

import com.aditya.springbootsocial.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment,Long> {

}
