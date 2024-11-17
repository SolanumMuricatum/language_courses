package com.courses.backend.repository;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
