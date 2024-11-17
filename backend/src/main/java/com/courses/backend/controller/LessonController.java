package com.courses.backend.controller;

import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.service.lesson.LessonService;
import com.courses.backend.service.module.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/lesson")
@CrossOrigin
public class LessonController {
    private final LessonService lessonService;

    @Autowired
    public LessonController(LessonService lessonService){
        this.lessonService = lessonService;
    }

    @GetMapping(value = "/getAll/{id}/{id2}")
    public ResponseEntity<List<Lesson>> getAllModules(@PathVariable(value = "id") String moduleId, @PathVariable(value = "id2") String userId){
        System.out.println("Возвращаемые уроки: " + lessonService.getLessons(moduleId, userId)); // Логирование
        return new ResponseEntity<>(lessonService.getLessons(moduleId, userId), HttpStatus.OK);
    }

}
