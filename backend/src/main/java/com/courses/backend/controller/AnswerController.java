package com.courses.backend.controller;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.service.answer.AnswerService;
import com.courses.backend.service.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/answer")
@CrossOrigin
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService){
        this.answerService = answerService;
    }

    @PutMapping(value = "add/{id}/{id2}")
    public ResponseEntity<?> addUserAnswer(@RequestBody Map<String, String> userAnswer, @PathVariable(value = "id") String taskId,
                                           @PathVariable(value = "id2") String userId){
        answerService.addUserAnswer(userAnswer.get("userAnswer"), taskId, userId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
