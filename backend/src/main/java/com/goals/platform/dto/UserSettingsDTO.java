package com.goals.platform.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettingsDTO {
    private boolean notificationsEnabled;
    private boolean publicProfile; // "light" or "dark" (maybe better to make enum)
    private boolean twoFactorEnabled;

    public boolean getPublicProfile() {
        return publicProfile;
    }

    public void setPublicProfile(boolean res) {
        this.publicProfile = res;
    }
}
