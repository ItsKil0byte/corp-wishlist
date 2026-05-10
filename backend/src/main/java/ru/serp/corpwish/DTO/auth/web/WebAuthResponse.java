package ru.serp.corpwish.DTO.auth.web;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WebAuthResponse {
    private String token;
}
