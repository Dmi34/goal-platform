package com.goals.platform.controller;

import com.goals.platform.dto.GoalDto;
import com.goals.platform.model.Goal;
import com.goals.platform.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // For MultipartFile
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/goals")
@RequiredArgsConstructor
public class GoalController {
    private final GoalService goalService;
    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestParam("goal") String goalJson,
                                            @RequestParam("guide") MultipartFile guideFile,
                                            @RequestParam("cover") MultipartFile coverFile) throws IOException {
        GoalDto goalDto = objectMapper.readValue(goalJson, GoalDto.class); // Convert JSON string to GoalDto
        return ResponseEntity.ok(goalService.createGoal(goalDto, guideFile, coverFile));
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Long id) {
        return ResponseEntity.ok(goalService.getGoalById(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, @RequestBody GoalDto goalDto) {
        return ResponseEntity.ok(goalService.updateGoal(id, goalDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.ok().build();
    }
}