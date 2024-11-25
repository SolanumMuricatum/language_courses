package com.courses.backend.repository;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    /*@Query("SELECT new com.courses.backend.model.task.TaskDTO" +
            "(t.id, t.name, t.description, t.right_answer, t.lesson.id) " +
            "FROM Task t " +
            "WHERE t.lesson.id = :lessonId " +
            "GROUP BY t.id, t.name, t.description, t.lesson.id ")

    List<TaskDTO> findAllTasks(@Param("lessonId") String lessonId);*/
    @Query("SELECT new com.courses.backend.model.task.TaskDTO" +
            "(t.id, t.name, t.description, t.right_answer, t.lesson.id, " +
            "COALESCE(a.userAnswer, null), COALESCE(CAST(r.result AS DOUBLE), null)) " +
            "FROM Task t " +
            "LEFT JOIN Answer a ON t.id = a.task.id AND a.user.id = :userId " + // Переместили условие в JOIN
            "LEFT JOIN Result r ON a.id = r.answer.id " +
            "WHERE t.lesson.id = :lessonId " +
            "GROUP BY t.id, t.name, t.description, t.right_answer, t.lesson.id, a.userAnswer, r.result")
    List<TaskDTO> findAllTasks(@Param("lessonId") String lessonId, @Param("userId") String userId);

    /*@Query("SELECT new com.courses.backend.model.task.Task" +
            "(t.id, t.name, t.description, t.right_answer, l, a) " +
            "FROM Task t LEFT JOIN Answer a ON a.id = t.answer.id " +
            "LEFT JOIN Lesson l ON l.id = t.lesson.id " +
            "LEFT JOIN Result r ON a.id = r.answer.id " +
            "WHERE t.lesson.id = :lessonId AND a.user.id = :userId " +
            "GROUP BY t.id, t.name, t.description, t.lesson.id, a.userAnswer, r.result")

    List<TaskDTO> findAllTasks(@Param("lessonId") String lessonId, @Param("userId") String userId);*/

    @Query("SELECT t.right_answer FROM Task t WHERE t.id = :taskId")
    String findRightAnswerById(@Param("taskId") String taskId);
}
