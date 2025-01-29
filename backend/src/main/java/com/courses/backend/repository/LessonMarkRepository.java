package com.courses.backend.repository;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.lesson.LessonMark;
import com.courses.backend.model.lesson.LessonMarkDTO;
import com.courses.backend.model.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonMarkRepository extends JpaRepository<LessonMark, Integer> {
    @Query("SELECT lm FROM LessonMark lm WHERE lm.lessonUserId.lessonId = :lessonId")
    List<LessonMark> getLessonMark(@Param("lessonId") String lessonId);

    @Query("SELECT new com.courses.backend.model.lesson.LessonMarkDTO " +
            "(u.name, u.surname, lm.mark) " +
            "FROM LessonMark lm JOIN User u ON lm.lessonUserId.userId = u.id " +
            "WHERE lm.lessonUserId.lessonId = :lessonId ")
    List<LessonMarkDTO> getLessonProgress(@Param("lessonId") String lessonId);

}
