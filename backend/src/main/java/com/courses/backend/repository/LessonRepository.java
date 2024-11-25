package com.courses.backend.repository;

import com.courses.backend.model.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {

   /* @Query("SELECT new com.courses.backend.model.lesson.Lesson(l.id, l.name, l.description, \n" +
            "ROUND(COALESCE(AVG(r.result) * 100, 0.0), 2), m) \n" +
            "FROM Lesson l " +
            "JOIN l.module m " +
            "JOIN l.task t " +
            "JOIN t.answer a " +
            "JOIN a.result r " +
            "WHERE l.module.id = :moduleId AND a.user.id = :userId " +
            "GROUP BY l.id, l.name, l.description, m.id")
    List<Lesson> findAverageResultsByUserId(@Param("moduleId") String moduleId, @Param("userId") String userId);*/


    @Query("SELECT new com.courses.backend.model.lesson.Lesson(l.id, l.name, l.description, COALESCE(lm.mark, null), m) " +
            "FROM Lesson l " +
            "JOIN l.module m " +
            "LEFT JOIN LessonMark lm ON l.id = lm.lessonUserId.lessonId AND lm.lessonUserId.userId = :userId " +
            "WHERE l.module.id = :moduleId")
    List<Lesson> findAllLessons(@Param("moduleId") String moduleId, @Param("userId") String userId);
}
