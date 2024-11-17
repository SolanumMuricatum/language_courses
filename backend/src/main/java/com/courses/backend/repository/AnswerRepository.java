package com.courses.backend.repository;

import com.courses.backend.controller.AnswerController;
import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
