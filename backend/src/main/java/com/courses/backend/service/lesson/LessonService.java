package com.courses.backend.service.lesson;

import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.module.ModuleDTO;

import java.util.List;

public interface LessonService {
    public List<Lesson> getLessons(String moduleId, String userId);
}
