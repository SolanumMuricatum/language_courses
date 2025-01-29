package com.courses.backend.service.course;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.repository.CoursesRepository;
import com.courses.backend.repository.UserRepository;
import com.courses.backend.service.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    private final CoursesRepository courseRepository;
    private final UserRepository userRepository;

    @Autowired
    public CourseServiceImpl (CoursesRepository courseRepository, UserRepository userRepository){
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void saveCourse(Course course) {
        courseRepository.save(course);
    }

    @Override
    public List<CourseDTO> getAllCourses(String id) {
        String role = userRepository.getUserRole(id);
        List<CourseDTO> courses = null;
        if(role.equals("teacher")){
            courses = courseRepository.findAllCoursesTeacher(id);
        } else if (role.equals("user")) {
            courses = courseRepository.findAllCoursesUser(id);
        }
        else if (role.equals("admin")){
            courses = courseRepository.findAllCoursesAdmin();
        }
        assert courses != null;
        return courses.stream()
                .sorted(Comparator.comparing(CourseDTO::getId)) // Сортировка по courseId
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCourse(String id) {
        courseRepository.delete(courseRepository.getReferenceById(id));
    }

    @Override
    public void updateCourse(Course course) {

    }

    @Override
    public List<CourseDTO> findAllCoursesAdmin(){
        return courseRepository.findAllCoursesAdmin();
    }

    @Override
    public List<CourseDTO> findCourseForUpdate(String id){
        return courseRepository.findCourseForUpdate(id);
    }
}
