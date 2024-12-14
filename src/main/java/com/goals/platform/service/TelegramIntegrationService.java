package com.goals.platform.service;

import com.goals.platform.model.Profile;
import com.goals.platform.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class TelegramIntegrationService {

    private final ProfileRepository profileRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${telegram.bot.token}")
    private String botToken;

    private static final String TELEGRAM_API_URL = "https://api.telegram.org/bot";

    public String linkTelegramAccount(Long userId, String telegramChatId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for user ID: " + userId));

        profile.setTelegramChatId(telegramChatId);
        profileRepository.save(profile);

        sendMessage(telegramChatId, "Your Telegram account has been successfully linked to your profile!");

        return "Telegram account linked successfully!";
    }

    public void sendMessage(String chatId, String message) {
        String url = TELEGRAM_API_URL + botToken + "/sendMessage" +
                "?chat_id=" + chatId +
                "&text=" + message;

        restTemplate.getForObject(url, String.class);
    }

    public String unlinkTelegramAccount(Long userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for user ID: " + userId));

        if (profile.getTelegramChatId() == null) {
            return "No Telegram account is linked to this profile.";
        }

        profile.setTelegramChatId(null);
        profileRepository.save(profile);

        return "Telegram account unlinked successfully!";
    }
}
