package com.courses.backend.controller;

import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.module.Module;
import com.courses.backend.service.lesson.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable(value = "id") String id){
        lessonService.deleteLesson(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getLessonForUpdate/{id}")
    public ResponseEntity<List<Lesson>> getLessonForUpdate(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(lessonService.findLessonForUpdate(id), HttpStatus.OK);
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateLesson(@RequestBody Map<String, String> lessonForUpdate, @PathVariable(value = "id") String lessonId){

        System.out.println(lessonForUpdate.get("moduleId"));
        Module module = new Module();
        module.setId(lessonForUpdate.get("moduleId"));

        Lesson lesson = new Lesson(lessonId, lessonForUpdate.get("name"), lessonForUpdate.get("description"), null, module);

        lessonService.saveLesson(lesson);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addLesson(@RequestBody Map<String, String> data){

        Module module = new Module();
        module.setId(data.get("moduleId"));
        Lesson lastLesson = null;

        try{
            lastLesson = lessonService.getAllLessons(data.get("moduleId")).getLast();
        }
        catch (NoSuchElementException ignored){

        }
        int id;

        if(lastLesson!=null){
            id = Integer.parseInt(String.valueOf(lastLesson.getId().charAt(0))) + 1;
        }
        else
            id = 1;

        String newLessonId = id + "_" + data.get("moduleId");

        Lesson lesson = new Lesson(newLessonId, data.get("name"), data.get("description"), null, module);

        lessonService.saveLesson(lesson);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
