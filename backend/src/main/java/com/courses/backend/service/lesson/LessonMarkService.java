package com.courses.backend.service.lesson;

import com.courses.backend.model.lesson.LessonMark;
import com.courses.backend.model.lesson.LessonMarkDTO;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonMarkService {
    public List<LessonMark> getLessonMark(String lessonId);

    public void saveAll(List<LessonMark> lessonMarks);

    List<LessonMarkDTO> getLessonProgress(String lessonId);
}
