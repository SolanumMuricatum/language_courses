package com.courses.backend.repository;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.result.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    @Query("SELECT new com.courses.backend.model.result.Result(r.id, r.result, r.answer) " +
            "FROM Result r WHERE r.answer.id = :answerId")
    List<Result> findResultsByAnswerId(@Param("answerId") Integer answerId);
}
