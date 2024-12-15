package com.goals.platform.service;

import com.goals.platform.dto.GoalDto;
import com.goals.platform.model.Goal;
import com.goals.platform.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal getGoalById(Long id) {
        return goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    public Goal createGoal(GoalDto goalDto) {
        Goal goal = Goal.builder()
                .title(goalDto.getTitle())
                .description(goalDto.getDescription())
                .price(goalDto.getPrice())
                .build();
        return goalRepository.save(goal);
    }

    public Goal updateGoal(Long id, GoalDto goalDto) {
        Goal existingGoal = getGoalById(id);
        existingGoal.setTitle(goalDto.getTitle());
        existingGoal.setDescription(goalDto.getDescription());
        existingGoal.setPrice(goalDto.getPrice());
        return goalRepository.save(existingGoal);
    }

    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}