package com.courses.backend.service.course;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;

import java.util.List;

public interface CourseService {
    public void saveCourse(Course course);
    public List<CourseDTO> getAllCourses(String id);
    public void deleteCourse(String id);
    public List<CourseDTO> findAllCoursesAdmin();
    public void updateCourse(Course course);
    public List<CourseDTO> findCourseForUpdate(String id);
}
