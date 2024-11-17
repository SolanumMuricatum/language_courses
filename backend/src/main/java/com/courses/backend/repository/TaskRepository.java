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
    @Query("SELECT new com.courses.backend.model.task.TaskDTO" +
            "(t.id, t.name, t.description, t.right_answer, t.lesson.id, a.userAnswer, r.result) " +
            "FROM Task t JOIN Answer a ON t.id = a.task.id " +
                        "JOIN User u ON u.id = a.user.id " +
                        "JOIN Result r ON a.id = r.answer.id " +
            "WHERE t.lesson.id = :lessonId AND a.user.id = :userId " +
            "GROUP BY t.id, t.name, t.description, t.lesson.id, a.userAnswer, r.result")

    List<TaskDTO> findAllTasks(@Param("lessonId") String moduleId, @Param("userId") String userId);

    @Query("SELECT t.right_answer FROM Task t WHERE t.id = :taskId")
    String findRightAnswerById(@Param("taskId") String taskId);
}
