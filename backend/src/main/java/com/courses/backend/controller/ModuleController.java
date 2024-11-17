package com.courses.backend.controller;

import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.repository.ModuleRepository;
import com.courses.backend.service.course.CourseService;
import com.courses.backend.service.module.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/module")
@CrossOrigin
public class ModuleController {
    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService){
        this.moduleService = moduleService;
    }

    @GetMapping(value = "/getAll/{id}")
    public ResponseEntity<List<ModuleDTO>> getAllModules(@PathVariable(value = "id") String id){
        System.out.println(moduleService.getAllModules(id));
        return new ResponseEntity<>(moduleService.getAllModules(id), HttpStatus.OK);
    }

}
