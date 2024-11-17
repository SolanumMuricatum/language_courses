package com.courses.backend.controller;

import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.service.module.ModuleService;
import com.courses.backend.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/task")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping(value = "/getAll/{id}/{id2}")
    public ResponseEntity<List<TaskDTO>> getAllTasks(@PathVariable(value = "id") String lessonId, @PathVariable(value = "id2") String userId){
        //System.out.println(taskService.getAllTasks(id));
        return new ResponseEntity<>(taskService.getAllTasks(lessonId, userId), HttpStatus.OK);
    }

}
