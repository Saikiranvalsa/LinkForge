package com.url.LinkForge_Backend.repository;

import com.url.LinkForge_Backend.dto.UrlMappingDto;
import com.url.LinkForge_Backend.model.UrlMapping;
import com.url.LinkForge_Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {

     UrlMapping findByShortUrl(String shortUrl) ;

    List<UrlMapping> findByUser(User user);
}
