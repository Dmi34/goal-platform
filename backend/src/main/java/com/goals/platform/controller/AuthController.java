package com.goals.platform.controller;

import com.goals.platform.dto.auth.AuthenticationRequest;
import com.goals.platform.dto.auth.AuthenticationResponse;
import com.goals.platform.dto.auth.RegisterRequest;
import com.goals.platform.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;


    // backend/src/main/java/com/goals/platform/controller/AuthController.java
    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(
        @RequestHeader("Authorization") String token
    ) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            return ResponseEntity.ok(authenticationService.refreshToken(token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}