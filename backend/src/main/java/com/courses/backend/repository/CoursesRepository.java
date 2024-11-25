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
            "(c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname, AVG(r.score)) " +
            "FROM Course c " +
            "JOIN User a ON c.teacher.id = a.id " +
            "JOIN Subscription s ON s.courseUserId.courseId = c.id " +
            "LEFT JOIN Rating r ON r.courseUserId.courseId = c.id " +
            "WHERE s.courseUserId.userId= :userId " +
            "GROUP BY c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname")
    List<CourseDTO> findAllCoursesUser(@Param("userId") String userId);

    @Query("SELECT new com.courses.backend.model.course.CourseDTO" +
            "(c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname, AVG(r.score)) " +
            "FROM Course c JOIN User a ON c.teacher.id = a.id " +
            "LEFT JOIN Rating r ON r.courseUserId.courseId = c.id " +
            "GROUP BY c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname")
    List<CourseDTO> findAllCoursesAdmin();

    @Query("SELECT new com.courses.backend.model.course.CourseDTO" +
            "(c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname, AVG(r.score)) " +
            "FROM Course c JOIN User a ON c.teacher.id = a.id " +
            "LEFT JOIN Rating r ON r.courseUserId.courseId = c.id " +
            "WHERE c.teacher.id = :teacherId " +
            "GROUP BY c.id, c.name, c.description, c.teacher.id, c.image, a.name, a.surname")
    List<CourseDTO> findAllCoursesTeacher(@Param("teacherId") String teacherId);
}
