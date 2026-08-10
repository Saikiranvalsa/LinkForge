package com.url.LinkForge_Backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterDto {
    private String email;
    private String username;
    private String password;
    private Set<String> role;
}
