package com.goals.platform.controller;

import com.goals.platform.dto.ProfileDTO;
import com.goals.platform.model.User;
import com.goals.platform.service.ProfileService;
import com.goals.platform.service.TelegramIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final TelegramIntegrationService telegramIntegrationService;

    // Add this method to ProfileController
    @GetMapping("/me")
    public ResponseEntity<ProfileDTO> getCurrentUserProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(profileService.getProfileByUserId(user.getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<ProfileDTO> updateCurrentUserProfile(
            Authentication authentication,
            @RequestBody ProfileDTO profileDTO
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(profileService.updateProfile(user.getId(), profileDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getProfileByUserId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileDTO> updateProfile(
            @PathVariable Long id,
            @RequestBody ProfileDTO profileDTO
    ) {
        return ResponseEntity.ok(profileService.updateProfile(id, profileDTO));
    }

    @PostMapping("/{id}/telegram/link")
    public ResponseEntity<String> linkTelegramAccount(
            @PathVariable Long id,
            @RequestParam String telegramChatId
    ) {
        String response = telegramIntegrationService.linkTelegramAccount(id, telegramChatId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}/telegram/unlink")
    public ResponseEntity<String> unlinkTelegramAccount(@PathVariable Long id) {
        String response = telegramIntegrationService.unlinkTelegramAccount(id);
        return ResponseEntity.ok(response);
    }
}
