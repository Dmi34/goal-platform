package com.goals.platform.service;

import com.goals.platform.dto.GoalDto;
import com.goals.platform.model.Goal;
import com.goals.platform.model.User;
import com.goals.platform.repository.CategoryRepository;
import com.goals.platform.repository.GoalRepository;
import com.goals.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal getGoalById(Long id) {
        return goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    public Goal createGoal(GoalDto goalDto) {
        User user = userRepository
                .findById(goalDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var categories = goalDto
                .getCategoriesId()
                .stream()
                .map(id -> categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found")))
                .toList();

        Goal goal = Goal.builder()
                .title(goalDto.getTitle())
                .description(goalDto.getDescription())
                .price(goalDto.getPrice())
                .startDate(goalDto.getStartDate())
                .endDate(goalDto.getEndDate())
                .isCompleted(goalDto.getIsCompleted())
                .user(user)
                .categories(categories)
                .build();

        user.getGoals().add(goal);
        userRepository.save(user);

        for (var category : categories) {
            category.getGoals().add(goal);
            categoryRepository.save(category);
        }

        return goalRepository.save(goal);
    }

    public Goal updateGoal(Long id, GoalDto goalDto) {
        Goal existingGoal = getGoalById(id);
        existingGoal.setTitle(goalDto.getTitle());
        existingGoal.setDescription(goalDto.getDescription());
        existingGoal.setPrice(goalDto.getPrice());
        existingGoal.setStartDate(goalDto.getStartDate());
        existingGoal.setEndDate(goalDto.getEndDate());
        existingGoal.setIsCompleted(goalDto.getIsCompleted());
        return goalRepository.save(existingGoal);
    }

    public void deleteGoal(Long id) {
        Goal goal = getGoalById(id);

        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.getGoals().remove(goal);
        userRepository.save(user);

        goal.getCategories().forEach(category -> {
            category.getGoals().remove(goal);
            categoryRepository.save(category);
        });

        goalRepository.deleteById(id);
    }
}