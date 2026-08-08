package com.url.LinkForge_Backend.controller;

import com.url.LinkForge_Backend.model.User;
import com.url.LinkForge_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository repository;
    @GetMapping
    public List<User> getUsers(){
        return repository.findAll();
    }
}
