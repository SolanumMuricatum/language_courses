package com.courses.backend.model.rating;

import com.courses.backend.model.subscription.CourseUserId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "rating")
public class Rating {
    @EmbeddedId
    private CourseUserId courseUserId;

    @Column(name = "score", columnDefinition = "INTEGER")
    private Integer score;
}