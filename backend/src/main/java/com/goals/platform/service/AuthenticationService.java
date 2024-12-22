package com.goals.platform.service;

import com.goals.platform.dto.auth.AuthenticationRequest;
import com.goals.platform.dto.auth.AuthenticationResponse;
import com.goals.platform.dto.auth.RegisterRequest;
import com.goals.platform.model.Role;
import com.goals.platform.model.User;
import com.goals.platform.repository.UserRepository;
import com.goals.platform.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ProfileService profileService;
    private final AuthenticationManager authenticationManager;

    // backend/src/main/java/com/goals/platform/service/AuthenticationService.java
    public AuthenticationResponse refreshToken(String expiredToken) {
        try {
            // Even if token is expired, we can still extract the username
            String userEmail = jwtService.extractUsername(expiredToken);
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            var savedUser = userRepository.save(user);

            profileService.createProfile(savedUser.getId());

            // Generate new token
            var newToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .token(newToken)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to refresh token", e);
        }
    }

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        var savedUser = userRepository.save(user);

        // Create profile for the new user
        profileService.createProfile(savedUser.getId());

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}