package ru.serp.corpwish.DTO;

import lombok.Data;

@Data
public class WebRegisterRequest {
    private String login;
    private String password;
}
