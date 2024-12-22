package com.goals.platform.controller;

import com.goals.platform.dto.ProfileDTO;
import com.goals.platform.model.User;
import com.goals.platform.service.ProfileService;
import com.goals.platform.service.TelegramIntegrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final TelegramIntegrationService telegramIntegrationService;
private final String UPLOAD_DIR = "uploads/avatars/";

    @PostMapping("/upload-avatar")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            // Create the directory if it doesn't exist
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the file to the specified directory
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(path, file.getBytes());

            // Return the file path or URL
            return ResponseEntity.ok(path.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload file");
        }
    }

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
}