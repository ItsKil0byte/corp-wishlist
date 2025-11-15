package ru.serp.corpwish.dto;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    private String login;
    private String password;
    private String firstName;
    private String lastName;
    private String middleName;
}
