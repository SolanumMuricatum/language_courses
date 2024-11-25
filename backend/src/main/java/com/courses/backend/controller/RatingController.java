package com.courses.backend.controller;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.rating.Rating;
import com.courses.backend.model.subscription.CourseUserId;
import com.courses.backend.model.user.User;
import com.courses.backend.service.rating.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/rating")
@CrossOrigin
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    //проверить, еть ли уже оценка от пользователя. если есть, то просто поменять его оценку
    //а ещё лучше поменять логику бд и сделать группированный ключ
    @PostMapping(value = "/add")
    public ResponseEntity<?> addRating(@RequestBody Map<String, String> r) {
        // Извлекаем данные из Map
        String courseId = r.get("courseId");
        String userId = r.get("user_id");
        Integer score = Integer.valueOf(r.get("rating"));

        CourseUserId courseUserId = new CourseUserId(courseId, userId);

        Rating rating = new Rating();
        rating.setCourseUserId(courseUserId);
        rating.setScore(score);

        ratingService.addCourseRating(rating);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
