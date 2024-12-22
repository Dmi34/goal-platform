package com.goals.platform.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean notificationsEnabled;
    private boolean publicProfile;
    private boolean twoFactorEnabled;

    public boolean getPublicProfile() {
        return publicProfile;
    }

    public void setPublicProfile(boolean res) {
        this.publicProfile = res;
    }

    @OneToOne
    @JoinColumn(name = "profile_id", nullable = false, unique = true)
    private Profile profile;
}
