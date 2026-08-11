package com.url.LinkForge_Backend.controller;

import com.url.LinkForge_Backend.dto.RegisterDto;
import com.url.LinkForge_Backend.model.User;
import com.url.LinkForge_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){
        User user=new User();
        user.setRole("ROLE_USER");
        user.setEmail(registerDto.getEmail());
        user.setUsername(registerDto.getUsername());
        user.setPassword(registerDto.getPassword());
        userService.register(user);
        return ResponseEntity.ok("Succefully registered");
    }
    @PostMapping("/public/login")
    public String login(@RequestBody User user){
        return userService.login(user);
    }
    @GetMapping("/display")
    public String display(){
        return "succefull authenticated";
    }

}
