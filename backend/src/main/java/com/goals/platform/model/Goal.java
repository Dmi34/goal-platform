package com.goals.platform.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}