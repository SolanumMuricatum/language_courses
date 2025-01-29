package com.courses.backend.controller;

import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.lesson.LessonMark;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.repository.LessonMarkRepository;
import com.courses.backend.service.lesson.LessonMarkService;
import com.courses.backend.service.module.ModuleService;
import com.courses.backend.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/task")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;
    private final LessonMarkService lessonMarkService;

    @Autowired
    public TaskController(TaskService taskService, LessonMarkService lessonMarkService){
        this.taskService = taskService;
        this.lessonMarkService = lessonMarkService;
    }

    @GetMapping(value = "/getAll/{id}/{id2}")
    public ResponseEntity<List<TaskDTO>> getAllTasks(@PathVariable(value = "id") String lessonId, @PathVariable(value = "id2") String userId){
        //System.out.println(taskService.getAllTasks(id));
        return new ResponseEntity<>(taskService.getTasks(lessonId, userId), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable(value = "id") String id){
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getTaskForUpdate/{id}")
    public ResponseEntity<List<Task>> getTaskForUpdate(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(taskService.findTaskForUpdate(id), HttpStatus.OK);
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Map<String, String> taskForUpdate, @PathVariable(value = "id") String taskId){

        Lesson lesson = new Lesson();
        lesson.setId(taskForUpdate.get("lessonId"));

        Task task = new Task(taskId, taskForUpdate.get("name"), taskForUpdate.get("description"), taskForUpdate.get("rightAnswer"), lesson, null);

        taskService.saveTask(task);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addTask(@RequestBody Map<String, String> data){

        Lesson lesson = new Lesson();
        lesson.setId(data.get("lessonId"));

        TaskDTO lastTask = null;

        try{
            lastTask = taskService.getAllTasks(data.get("lessonId")).getLast();
        }
        catch (NoSuchElementException ignored){

        }
        int id;

        if(lastTask!=null){
            id = Integer.parseInt(String.valueOf(lastTask.getId().charAt(0))) + 1;
        }
        else
            id = 1;

        String newTaskId = id + "_" + data.get("lessonId");

        Task task = new Task(newTaskId, data.get("name"), data.get("description"), data.get("rightAnswer"), lesson, null );

        taskService.saveTask(task);

        List<LessonMark> lessonMarks = lessonMarkService.getLessonMark(lesson.getId());

        for (LessonMark lessonMark : lessonMarks) {
            lessonMark.setMark("В процессе");
        }

        lessonMarkService.saveAll(lessonMarks);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
