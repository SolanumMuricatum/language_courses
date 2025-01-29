package com.courses.backend.repository;

import com.courses.backend.model.user.User;
import com.courses.backend.model.user.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u.role FROM User u WHERE u.id = :userId")
    String getUserRole(@Param("userId") String userId);

    @Query("SELECT u FROM User u")
    List<User> getAllUsers();

    @Query("SELECT new com.courses.backend.model.user.UserDTO(u.name, u.surname, SUM(b.point)) \n" +
            "FROM User u JOIN Bonus b ON b.lessonUserId.userId = u.id " +
            "where u.role = 'user' " +
            "GROUP BY u.id")
    List<UserDTO> getUserScore();

    @Query("SELECT u FROM User u WHERE u.role = 'teacher'")
    List<User> getTeacher();

    @Query("SELECT u FROM User u " +
            "JOIN Subscription sb ON u.id = sb.courseUserId.userId " +
            "WHERE u.role = 'user' AND sb.courseUserId.courseId = :courseId")
    List<User> getOnlyUsers(@Param("courseId") String courseId);

    @Query("SELECT u FROM User u " +
            "WHERE u.role = 'user' AND u.id NOT IN (" +
            "SELECT sb.courseUserId.userId FROM Subscription sb WHERE sb.courseUserId.courseId = :courseId)")
    List<User> getUsersWithoutSubscription(@Param("courseId") String courseId);

    @Query("SELECT u FROM User u WHERE u.id = :userId")
    List<User> findUserForUpdate(@Param("userId") String userId);
}
