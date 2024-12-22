package com.goals.platform.service;

import com.goals.platform.dto.ProfileDTO;
import com.goals.platform.dto.UserSettingsDTO;
import com.goals.platform.model.Profile;
import com.goals.platform.model.User;
import com.goals.platform.model.UserSettings;
import com.goals.platform.repository.ProfileRepository;
import com.goals.platform.repository.UserRepository;
import com.goals.platform.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;

    // Get profile with settings
    public ProfileDTO getProfileByUserId(Long userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for user ID: " + userId));
        return mapToDTO(profile);
    }

    // Update profile information and settings
    public ProfileDTO updateProfile(Long userId, ProfileDTO profileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Profile profile = profileRepository.findByUserId(userId).orElse(new Profile());
        profile.setUser(user);
        profile.setBio(profileDTO.getBio());
        profile.setPhoneNumber(profileDTO.getPhoneNumber());
        profile.setAddress(profileDTO.getAddress());
        user.setFirstname(profileDTO.getUser().getFirstname());
        user.setLastname(profileDTO.getUser().getLastname());
        // Update or create user settings
        UserSettings settings = profile.getUserSettings();
        if (settings == null) {
            settings = new UserSettings();
            settings.setProfile(profile);
        }
        settings.setNotificationsEnabled(profileDTO.getUserSettings().isNotificationsEnabled());
        settings.setPublicProfile(profileDTO.getUserSettings().getPublicProfile());
        settings.setTwoFactorEnabled(profileDTO.getUserSettings().isTwoFactorEnabled());

        profile.setUserSettings(settings);

        Profile savedProfile = profileRepository.save(profile);
        return mapToDTO(savedProfile);
    }

    public ProfileDTO createProfile(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

    Profile profile = Profile.builder()
            .user(user)
            .build();
            
    Profile savedProfile = profileRepository.save(profile);
    return mapToDTO(savedProfile);
}


    private ProfileDTO mapToDTO(Profile profile) {
        UserSettings settings = profile.getUserSettings();
        UserSettingsDTO settingsDTO = null;
        if (settings != null) {
            settingsDTO = UserSettingsDTO.builder()
                    .notificationsEnabled(settings.isNotificationsEnabled())
                    .publicProfile(settings.getPublicProfile())
                    .twoFactorEnabled(settings.isTwoFactorEnabled())
                    .build();
        }

        return ProfileDTO.builder()
                .id(profile.getId())
                .bio(profile.getBio())
                .phoneNumber(profile.getPhoneNumber())
                .address(profile.getAddress())
                .email(profile.getUser().getEmail())
                .userSettings(settingsDTO)
                .build();
    }
}
