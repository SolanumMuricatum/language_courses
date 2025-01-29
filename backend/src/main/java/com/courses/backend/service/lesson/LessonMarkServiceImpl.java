package com.courses.backend.service.lesson;

import com.courses.backend.model.lesson.LessonMark;
import com.courses.backend.model.lesson.LessonMarkDTO;
import com.courses.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonMarkServiceImpl implements LessonMarkService{

    private final LessonMarkRepository lessonMarkRepository;
    @Autowired
    public LessonMarkServiceImpl (LessonMarkRepository lessonMarkRepository){
        this.lessonMarkRepository = lessonMarkRepository;
    }
    @Override
    public List<LessonMark> getLessonMark(String lessonId) {
        return lessonMarkRepository.getLessonMark(lessonId);
    }
    @Override
    public void saveAll(List<LessonMark> lessonMarks) {
        lessonMarkRepository.saveAll(lessonMarks);
    }

    @Override
    public List<LessonMarkDTO> getLessonProgress(String lessonId) {
        return lessonMarkRepository.getLessonProgress(lessonId);
    }


}
