package com.url.LinkForge_Backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClickEventDto {
    private LocalDate clickDate;
    private int count;
}
