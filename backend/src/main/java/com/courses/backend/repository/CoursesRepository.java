package com.courses.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import java.util.List;

@Repository
public interface CoursesRepository extends JpaRepository<Course, Integer> {

    @Query("SELECT new com.courses.backend.model.course.CourseDTO" +
            "(c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname) " +
            "FROM Course c " +
            "JOIN User a ON c.teacher.id = a.id " +
            "JOIN Subscription s ON s.courseUserId.course_id = c.id " +
            "WHERE s.courseUserId.user_id= :userId")
    List<CourseDTO> findAllCourses(@Param("userId") String userId);

    @Query("SELECT new com.courses.backend.model.course.CourseDTO" +
            "(c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname) " +
            "FROM Course c JOIN User a ON c.teacher.id = a.id")
    List<CourseDTO> findAllCoursesAdmin();
}
