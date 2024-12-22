package com.goals.platform.service;

import com.goals.platform.dto.CategoryDTO;
import com.goals.platform.model.Category;
import com.goals.platform.repository.CategoryRepository;
import com.goals.platform.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final GoalRepository goalRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Category createCategory(CategoryDTO categoryDto) {
        Category category = Category.builder()
                .name(categoryDto.getName())
                .description(categoryDto.getDescription())
                .build();
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryDTO categoryDto) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(categoryDto.getName());
        existingCategory.setDescription(categoryDto.getDescription());
        return categoryRepository.save(existingCategory);
    }

    public void deleteCategory(Long id) {
        Category category = getCategoryById(id);

        var goals = category.getGoals();

        for (var goal : goals) {
            goal.getCategories().remove(category);
            goalRepository.save(goal);
        }

        categoryRepository.deleteById(id);
    }
}