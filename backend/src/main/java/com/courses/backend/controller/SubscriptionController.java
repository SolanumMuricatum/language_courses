package com.courses.backend.controller;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.subscription.CourseUserId;
import com.courses.backend.model.subscription.Subscription;
import com.courses.backend.service.subscription.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/subscription")
@CrossOrigin
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService){
        this.subscriptionService = subscriptionService;
    }

    @DeleteMapping(value = "/delete/{user_id}/{course_id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "user_id") String userId, @PathVariable(value = "course_id") String courseId){

        CourseUserId courseUserId = new CourseUserId(courseId, userId);
        subscriptionService.deleteSubscription(courseUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/add/{course_id}/{user_id}")
    public ResponseEntity<?> addSubscription(@PathVariable(value = "user_id") String userId, @PathVariable(value = "course_id") String courseId){

        CourseUserId courseUserId = new CourseUserId(courseId, userId);

        Subscription subscription = new Subscription(courseUserId);

        subscriptionService.saveSubscription(subscription);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
