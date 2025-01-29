package com.courses.backend.service.lesson;

import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;

import java.util.List;

public interface LessonService {
    public List<Lesson> getAllLessons(String moduleId);
    public List<Lesson> getLessons(String moduleId, String userId);
    public void deleteLesson(String id);
    public List<Lesson> findLessonForUpdate(String id);
    public void saveLesson(Lesson lesson);
}
