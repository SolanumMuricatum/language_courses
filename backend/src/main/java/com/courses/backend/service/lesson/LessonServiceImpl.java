package com.courses.backend.service.lesson;

import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.repository.LessonRepository;
import com.courses.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonServiceImpl implements LessonService{

    private final LessonRepository lessonRepository;

    @Autowired
    public LessonServiceImpl (LessonRepository lessonRepository){
        this.lessonRepository = lessonRepository;
    }

    @Override
    public List<Lesson> getLessons(String moduleId, String userId) {
        List<Lesson> lessons = lessonRepository.findAverageResultsByUserId(moduleId, userId);

        return lessons.stream()
                .sorted(Comparator.comparing(Lesson::getId)) // Сортировка по courseId
                .collect(Collectors.toList());
    }
}
