package com.goals.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Random;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final Random random = new Random();

    @GetMapping("/random")
    public Map<String, Integer> getRandomNumber() {
        int randomNumber = random.nextInt(10) + 1; // Random number between 1 and 10
        Map<String, Integer> response = new HashMap<>();
        response.put("number", randomNumber);
        return response;
    }
}