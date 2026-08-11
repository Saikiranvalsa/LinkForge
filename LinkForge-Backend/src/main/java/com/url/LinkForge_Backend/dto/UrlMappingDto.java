package com.url.LinkForge_Backend.dto;

import lombok.Data;
import org.apache.catalina.User;

import java.time.LocalDateTime;

@Data
public class UrlMappingDto {
    public Long id;
    private  String originalUrl;
    private String shortUrl;
    private int clickCount;
    private LocalDateTime createdDate;
    private String username;
}
