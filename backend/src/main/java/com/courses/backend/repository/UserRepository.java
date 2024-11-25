package com.courses.backend.repository;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.user.User;
import com.courses.backend.model.user.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u.role FROM User u WHERE u.id = :userId")
    String getUserRole(@Param("userId") String userId);

    @Query("SELECT new com.courses.backend.model.user.UserDTO(u.name, u.surname, SUM(b.point)) \n" +
            "FROM User u JOIN Bonus b ON b.lessonUserId.userId = u.id " +
            "where u.role = 'user' " +
            "GROUP BY u.id")
    List<UserDTO> getUserScore();
}
