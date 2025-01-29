package com.courses.backend.controller;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.user.User;
import com.courses.backend.service.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(value = "/course")
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

    @GetMapping(value = "/getAll/{id}")
    public ResponseEntity<List<CourseDTO>> getAllCourses(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(courseService.getAllCourses(id), HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addCourse(@RequestBody Map<String, String> data){

        User teacher = new User();
        teacher.setId(data.get("teacherId"));
        List<CourseDTO> courses = courseService.findAllCoursesAdmin();

        List<CourseDTO> filteredCourses = courses.stream()
                .filter(course -> course.getId().contains(data.get("language")))
                .toList();

        // Находим курс с наибольшим первым числом в id
        Integer maxIdNumber = filteredCourses.stream()
                .map(course -> {
                    // Извлекаем первое число из id
                    String[] parts = course.getId().split("_");
                    return Integer.parseInt(parts[0]); // Предположим, что id имеет формат "число_другая_часть"
                })
                .max(Integer::compareTo).orElse(null); // Находим максимум

        int id;

        System.out.println(maxIdNumber);
        if (maxIdNumber != null) {
            id = maxIdNumber + 1; // Увеличиваем найденное число на 1
        } else {
            id = 1; // Если число не найдено, начинаем с 1
        }

        String newCourseId = id + "_" + data.get("language") + "_" + data.get("difficulty");

        System.out.println(newCourseId);

        Course course = new Course(newCourseId, data.get("name"), data.get("description"), null, data.get("image"), teacher);

        courseService.saveCourse(course);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable(value = "id") String id){
        courseService.deleteCourse(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getCourseForUpdate/{id}")
    public ResponseEntity<List<CourseDTO>> getCourseForUpdate(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(courseService.findCourseForUpdate(id), HttpStatus.OK);
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateCourse(@RequestBody Map<String, String> courseForUpdate, @PathVariable(value = "id") String courseId) {

        User teacher = new User();
        teacher.setId(courseForUpdate.get("teacherId"));

        Course course = new Course(courseId, courseForUpdate.get("name"), courseForUpdate.get("description"), null, courseForUpdate.get("image"), teacher);

        courseService.saveCourse(course);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
