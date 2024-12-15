package com.goals.platform.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettingsDTO {
    private boolean notificationsEnabled;
    private String themePreference; // "light" or "dark" (maybe better to make enum)
    private boolean twoFactorEnabled;
}
