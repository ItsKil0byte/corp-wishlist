package ru.serp.corpwish.DTO;

import lombok.Data;

@Data
public class WebLoginRequest {
    private String login;
    private String password;
}
