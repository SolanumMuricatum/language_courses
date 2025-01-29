package com.courses.backend.controller;

import com.courses.backend.model.lesson.LessonMarkDTO;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.service.lesson.LessonMarkService;
import com.courses.backend.service.lesson.LessonMarkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/lesson/mark")
@CrossOrigin
public class LessonMarkController {

    private final LessonMarkService lessonMarkService;

    @Autowired
    public LessonMarkController(LessonMarkService lessonMarkService){
        this.lessonMarkService = lessonMarkService;
    }

    @GetMapping(value = "/getProgress/{id}")
    public ResponseEntity<List<LessonMarkDTO>> getLessonProgress(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(lessonMarkService.getLessonProgress(id), HttpStatus.OK);
    }
}
