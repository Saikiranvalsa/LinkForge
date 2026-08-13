package com.url.LinkForge_Backend.controller;

import com.url.LinkForge_Backend.model.UrlMapping;
import com.url.LinkForge_Backend.service.UrlMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class RedirectController {

    @Autowired
    private UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {

        System.out.println("=================================");
        System.out.println("REDIRECT REQUEST RECEIVED");
        System.out.println("SHORT URL: " + shortUrl);
        System.out.println("TIME: " + LocalDateTime.now());
        System.out.println("=================================");

        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);

        if (urlMapping != null) {

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location", urlMapping.getOriginalUrl());

            return ResponseEntity
                    .status(302)
                    .headers(httpHeaders)
                    .build();

        } else {

            return ResponseEntity.notFound().build();
        }
    }
}