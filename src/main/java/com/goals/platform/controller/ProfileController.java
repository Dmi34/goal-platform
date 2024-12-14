package com.goals.platform.controller;

import com.goals.platform.dto.ProfileDTO;
import com.goals.platform.service.ProfileService;
import com.goals.platform.service.TelegramIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final TelegramIntegrationService telegramIntegrationService;

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
