package com.courses.backend.service.course;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.repository.CoursesRepository;
import com.courses.backend.service.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    private final CoursesRepository courseRepository;

    @Autowired
    public CourseServiceImpl (CoursesRepository courseRepository){
        this.courseRepository = courseRepository;
    }


    @Override
    public void saveCourse(Course course) {
        courseRepository.save(course);
    }

    @Override
    public List<CourseDTO> getAllCourses(String id) {
        List<CourseDTO> courses = courseRepository.findAllCoursesAdmin(); //!!!! разобраться какой метод когда вызывать

        return courses.stream()
                .sorted(Comparator.comparing(CourseDTO::getId)) // Сортировка по courseId
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCourse(Integer id) {

    }

    @Override
    public void updateCourse(Course course) {

    }
}
