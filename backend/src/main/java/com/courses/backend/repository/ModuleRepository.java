package com.courses.backend.repository;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ModuleRepository extends JpaRepository<Module, String> {

    @Query("SELECT new com.courses.backend.model.module.ModuleDTO" +
            "(c.id, c.name, c.description, c.course.id, a.name) " +
            "FROM Module c JOIN Course a ON c.course.id = a.id")
    List<ModuleDTO> findAllModules();

    @Query("SELECT new com.courses.backend.model.module.ModuleDTO" +
            "(c.id, c.name, c.description, c.course.id, a.name) " +
            "FROM Module c JOIN Course a ON c.course.id = a.id " +
            "WHERE c.id = :moduleId")
    List<ModuleDTO> findModuleForUpdate(@Param("moduleId") String moduleId);
}



/*
import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.data.repository.query.Param;
        import org.springframework.stereotype.Repository;

        import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @Query("SELECT new Lesson(l.id, l.description, l.module.id, AVG(a.results)) " +
            "FROM Lesson l " +
            "JOIN l.module m " +
            "JOIN l.tasks t " +
            "JOIN t.answers a " +
            "WHERE a.user.id = :userId " +
            "GROUP BY l.id, l.description, l.module.id")
    List<Lesson> findAverageResultsByUserId(@Param("userId") Long userId);
}*/
