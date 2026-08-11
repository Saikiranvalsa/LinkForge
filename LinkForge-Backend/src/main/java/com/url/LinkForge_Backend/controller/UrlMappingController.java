package com.url.LinkForge_Backend.controller;

import com.url.LinkForge_Backend.dto.ClickEventDto;
import com.url.LinkForge_Backend.dto.UrlMappingDto;
import com.url.LinkForge_Backend.model.UrlMapping;
import com.url.LinkForge_Backend.model.User;
import com.url.LinkForge_Backend.service.UrlMappingService;
import com.url.LinkForge_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
public class UrlMappingController {
    @Autowired
    private UserService userService;
    @Autowired
    private UrlMappingService urlMappingService;

    // request=====>originalUrl : http://google.com
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDto> createShortUrl(@RequestBody Map<String,String> request, Principal principal){
        String originalUrl=request.get("originalUrl");
        User user=userService.findByUserName(principal.getName());
        UrlMappingDto urlMappingDto=urlMappingService.createShortUrl(originalUrl,user);
        return ResponseEntity.ok(urlMappingDto);
    }

    @GetMapping("/myUrls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDto>> getUserUrls(Principal principal){
        User user=userService.findByUserName(principal.getName());
        List<UrlMappingDto> urls=urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDto>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter=DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start=LocalDateTime.parse(startDate,formatter);
        LocalDateTime end=LocalDateTime.parse(endDate,formatter);
        List<ClickEventDto> clickEventDtos=urlMappingService.getClickUrlByDate(shortUrl,start,end);
        return ResponseEntity.ok(clickEventDtos);
    }
    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate,Long>> getUrlAnalytics(Principal principal,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate){
        User user=userService.findByUserName(principal.getName());
        DateTimeFormatter formatter=DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start=LocalDate.parse(startDate,formatter);
        LocalDate end=LocalDate.parse(endDate,formatter);
        Map<LocalDate, Long> totalClicks=urlMappingService.getTotalClicksByUserAndDate(user,start,end);
        return ResponseEntity.ok(totalClicks);

    }
}
