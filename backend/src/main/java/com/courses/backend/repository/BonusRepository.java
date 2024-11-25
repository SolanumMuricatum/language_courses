package com.courses.backend.repository;

import com.courses.backend.model.bonus.Bonus;
import com.courses.backend.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BonusRepository extends JpaRepository<Bonus, Integer> {
}
