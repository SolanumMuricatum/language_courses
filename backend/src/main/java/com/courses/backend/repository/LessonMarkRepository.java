package com.courses.backend.repository;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.lesson.LessonMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonMarkRepository extends JpaRepository<LessonMark, Integer> {

}
