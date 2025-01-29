package com.courses.backend.controller;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.repository.ModuleRepository;
import com.courses.backend.service.course.CourseService;
import com.courses.backend.service.module.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable(value = "id") String id){
        moduleService.deleteModule(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getModuleForUpdate/{id}")
    public ResponseEntity<List<ModuleDTO>> getModuleForUpdate(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(moduleService.findModuleForUpdate(id), HttpStatus.OK);
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateModule(@RequestBody Map<String, String> moduleForUpdate, @PathVariable(value = "id") String moduleId){

        Course course = new Course();
        course.setId(moduleForUpdate.get("courseId"));

        Module module = new Module(moduleId, moduleForUpdate.get("name"), moduleForUpdate.get("description"), course);

        moduleService.saveModule(module);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addModule(@RequestBody Map<String, String> data){

        Course course = new Course();
        course.setId(data.get("courseId"));
        ModuleDTO lastModule = null;
        try{
            lastModule = moduleService.getAllModules(data.get("courseId")).getLast();
        }
        catch (NoSuchElementException ignored){}

        int id;

        if(lastModule!=null){
            id = Integer.parseInt(String.valueOf(lastModule.getId().charAt(0))) + 1;
        }
        else
            id = 1;

        String newModuleId = id + "_" + data.get("courseId").substring(2);

        Module module = new Module(newModuleId, data.get("name"), data.get("description"), course);

        moduleService.saveModule(module);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
