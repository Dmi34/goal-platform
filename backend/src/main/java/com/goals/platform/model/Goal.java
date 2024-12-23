package com.goals.platform.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private BigDecimal price;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Boolean isCompleted;

    @ManyToMany
    private List<Category> categories;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String guidePath; // Path to the guide file
    private String coverPath; // Path to the cover image
    private String status; //pending | approved | rejected
}