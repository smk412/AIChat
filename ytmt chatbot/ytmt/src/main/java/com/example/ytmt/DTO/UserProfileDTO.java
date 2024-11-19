package com.example.ytmt.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserProfileDTO {
    private String nickname;
    private String email;
    private String name;
    private String password;
    private String major;
    private String role;
}
