package com.url.LinkForge_Backend.service;

import com.url.LinkForge_Backend.dto.ClickEventDto;
import com.url.LinkForge_Backend.dto.UrlMappingDto;
import com.url.LinkForge_Backend.model.ClickEvent;
import com.url.LinkForge_Backend.model.UrlMapping;
import com.url.LinkForge_Backend.model.User;
import com.url.LinkForge_Backend.repository.ClickEventRepository;
import com.url.LinkForge_Backend.repository.UrlMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UrlMappingService {
    @Autowired
    private ClickEventRepository clickEventRepository;

    @Autowired
    private UrlMappingRepository urlMappingRepository;


    public UrlMappingDto createShortUrl(String originalUrl, User user) {

        String shortUrl = generateshortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    public UrlMappingDto convertToDto(UrlMapping urlMapping) {
        UrlMappingDto urlMappingDto = new UrlMappingDto();
        urlMappingDto.setId(urlMapping.getId());
        urlMappingDto.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDto.setShortUrl(urlMapping.getShortUrl());
        urlMappingDto.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDto.setClickCount(urlMapping.getClickCount());
        urlMappingDto.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDto;
    }

    private String generateshortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }

        return shortUrl.toString();
    }

    public List<UrlMappingDto> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }

    public List<ClickEventDto> getClickUrlByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {

        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping,start,end).stream()
                    .collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate(),Collectors.counting()))
                    .entrySet().stream()
                    .map(entry->{
                        ClickEventDto clickEventDto=new ClickEventDto();
                        clickEventDto.setClickDate(entry.getKey());
                        clickEventDto.setCount(entry.getValue().intValue());
                        return clickEventDto;
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> urlMappings=urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents=clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings,start.atStartOfDay(),end.plusDays(1).atStartOfDay());
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate(),Collectors.counting()));
    }

    public UrlMapping getOriginalUrl(String shortUrl) {

        System.out.println("******** GET ORIGINAL URL ********");
        System.out.println("SHORT URL: " + shortUrl);
        System.out.println("TIME: " + LocalDateTime.now());

        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        if (urlMapping != null) {

            System.out.println("URL FOUND: " + urlMapping.getOriginalUrl());
            System.out.println("OLD CLICK COUNT: " + urlMapping.getClickCount());

            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            System.out.println("NEW CLICK COUNT: " + urlMapping.getClickCount());

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);

            clickEventRepository.save(clickEvent);

            System.out.println("CLICK EVENT SAVED");
            System.out.println("********************************");
        }

        return urlMapping;
    }
}
