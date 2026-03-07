package ru.serp.corpwish.DTO.auth.web;

import lombok.Data;

@Data
public class WebRegisterRequest {
    private String login;
    private String password;
}
