package com.goals.platform.service;

import com.goals.platform.dto.GoalDto;
import com.goals.platform.model.Goal;
import com.goals.platform.model.User;
import com.goals.platform.model.Profile;
import com.goals.platform.repository.CategoryRepository;
import com.goals.platform.repository.GoalRepository;
import com.goals.platform.repository.UserRepository;
import com.goals.platform.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile; // For MultipartFile
import java.io.IOException;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;



@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProfileRepository profileRepository;

    private final String UPLOAD_DIR = "uploads/goals/";

    public Goal createGoal(GoalDto goalDto, MultipartFile guideFile, MultipartFile coverFile) throws IOException {
        User user = userRepository
                .findById(goalDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        
        if (!profileRepository.existsByUserId(user.getId())) {
            Profile profile = new Profile();
            profile.setUser(user);
            // Set other profile fields as necessary
            profileRepository.save(profile);
        }
        
        
        // Save guide file
        String guidePath = saveFile(guideFile);
        // Save cover file
        String coverPath = saveFile(coverFile);

        Goal goal = Goal.builder()
                .title(goalDto.getTitle())
                .description(goalDto.getDescription())
                .price(goalDto.getPrice())
                .startDate(goalDto.getStartDate())
                .endDate(goalDto.getEndDate())
                .isCompleted(false) // Default to false
                .user(user)
                .guidePath(guidePath) // Assuming you have a field for guide path
                .coverPath(coverPath) // Assuming you have a field for cover path
                .status("Pending") // Set initial status to Pending
                .build();

        user.getGoals().add(goal.getId());
        userRepository.save(user);
        return goalRepository.save(goal);
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        // Create the directory if it doesn't exist
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Save the file to the specified directory
        Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
        Files.write(path, file.getBytes());

        return path.toString(); // Return the file path
    }

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal getGoalById(Long id) {
        return goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
    }
    /*
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
    } */

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