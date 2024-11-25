package com.courses.backend.service.lesson;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.bonus.Bonus;
import com.courses.backend.model.bonus.LessonUserId;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.lesson.LessonMark;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class LessonServiceImpl implements LessonService{

    private final LessonRepository lessonRepository;
    private final AnswerRepository answerRepository;
    private final ResultRepository resultRepository;

    private final BonusRepository bonusRepository;

    private final TaskRepository taskRepository;

    private final LessonMarkRepository lessonMarkRepository;

    @Autowired
    public LessonServiceImpl (LessonRepository lessonRepository, AnswerRepository answerRepository,
                              ResultRepository resultRepository, TaskRepository taskRepository,
                              BonusRepository bonusRepository, LessonMarkRepository lessonMarkRepository){
        this.lessonRepository = lessonRepository;
        this.answerRepository = answerRepository;
        this.resultRepository = resultRepository;
        this.taskRepository = taskRepository;
        this.bonusRepository = bonusRepository;
        this.lessonMarkRepository = lessonMarkRepository;
    }

    @Override
    public List<Lesson> getLessons(String moduleId, String userId) {
        List<Lesson> lessons = lessonRepository.findAllLessons(moduleId, userId);

        for (Lesson lesson : lessons) {
            List<TaskDTO> tasks = taskRepository.findAllTasks(lesson.getId(), userId);

            long countNonNullAnswers = tasks.stream()
                    .filter(taskDTO -> taskDTO.getUserAnswer() != null)
                    .count();
            int tasksSize = tasks.size();

            if (lesson.getMark() == null || "В процессе".equals(lesson.getMark())) {
                LessonUserId lessonUserId = new LessonUserId(lesson.getId(), userId);

                if (tasksSize > 0 && countNonNullAnswers < tasksSize && countNonNullAnswers!=0) {

                    lessonMarkRepository.save(new LessonMark(lessonUserId, "В процессе"));
                }

                else if (countNonNullAnswers == tasksSize) {
                    // Если все ответы есть
                    double mark = tasks.stream()
                            .mapToDouble(TaskDTO::getResult)
                            .sum();
                    mark = Math.round((mark * 100 / tasksSize) * 10.0) / 10.0;

                    lessonMarkRepository.save(new LessonMark(lessonUserId, String.valueOf(mark + "%")));

                    int point = (mark >= 50) ? 2 : 1; // Используем тернарный оператор для определения балла

                    Bonus bonus = new Bonus(lessonUserId, point);
                    bonusRepository.save(bonus);
                }
            }
        }
        return lessons.stream()
                .sorted(Comparator.comparing(Lesson::getId)) // Сортировка по lessonId
                .collect(Collectors.toList());
    }
}
