package com.courses.backend.repository;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.rating.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
}
