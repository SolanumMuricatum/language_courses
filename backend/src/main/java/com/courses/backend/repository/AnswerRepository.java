package com.courses.backend.repository;

import com.courses.backend.model.answer.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    @Query("SELECT a " +
            "FROM Answer a WHERE a.user.id = :userId AND a.task.id = :taskId")
    List<Answer> findUserAnswer(@Param("userId") String userId, @Param("taskId") String taskId);

  /* @Query("SELECT new com.courses.backend.model.answer.AnswerDTO" +
            "(a.id, a.userAnswer, a., t.right_answer, t.lesson.id, a.userAnswer, r.result) " +
            "FROM Task t LEFT JOIN Answer a ON t.id = a.task.id " +
                        "JOIN User u ON u.id = a.user.id " +
                        "LEFT JOIN Result r ON a.id = r.answer.id " +
            "WHERE t.lesson.id = :lessonId AND a.user.id = :userId " +
            "GROUP BY t.id, t.name, t.description, t.lesson.id, a.userAnswer, r.result")

    List<AnswerDTO> findUserAnswer(@Param("taskId") String lessonId, @Param("userId") String userId);*/

}
