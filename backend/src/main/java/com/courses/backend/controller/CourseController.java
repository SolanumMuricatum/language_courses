package com.courses.backend.controller;

import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.service.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/course")
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

   /* @PostMapping(value = "/add")
    public ResponseEntity<?> addEvent(@RequestBody Event event) {
        eventService.saveEvent(event);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }*/

    @GetMapping(value = "/getAll/{id}")
    public ResponseEntity<List<CourseDTO>> getAllCourses(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(courseService.getAllCourses(id), HttpStatus.OK);
    }


   /* @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable(value = "id") Integer id){
        eventService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }*/

  /*  @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable(value = "id") Integer id, @RequestBody Event event){
        event.setId(id);
        eventService.updateEvent(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }*/

/*    @PostMapping(value = "/enter")
    public ResponseEntity<?> enterAdmin(@RequestBody Admin admin){
        final boolean response = (admin.getLogin().equals("admin") && admin.getPassword().equals("123"));

        return response
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }*/

/*    {
        "name": "Hanna",
            "date": "28.04.2024",
            "description": "hello",
            "faculty": "fcad",
            "corps": "1",
            "time": "18:00",
            "link": "cjnjasx",
            "image": "kdmk"
    }*/

}
