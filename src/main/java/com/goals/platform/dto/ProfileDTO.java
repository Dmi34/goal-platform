package com.goals.platform.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDTO {
    private Long id;
    private String bio;
    private String phoneNumber;
    private String address;
    private String email;

    private UserSettingsDTO userSettings;
}
