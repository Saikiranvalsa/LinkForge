package com.url.LinkForge_Backend.repository;

import java.util.List;
import com.url.LinkForge_Backend.model.ClickEvent;
import com.url.LinkForge_Backend.model.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvent,Long> {
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping urlmapping,LocalDateTime startDate,LocalDateTime endDate);
    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping> urlmapping,LocalDateTime startDate,LocalDateTime endDate);
}