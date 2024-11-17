package com.courses.backend.service.answer;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.result.Result;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.repository.AnswerRepository;
import com.courses.backend.repository.ResultRepository;
import com.courses.backend.repository.TaskRepository;
import com.courses.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerServiceImpl implements AnswerService{

    private final AnswerRepository answerRepository;
    private final TaskRepository taskRepository;

    private final ResultRepository resultRepository;

    @Autowired
    public AnswerServiceImpl (AnswerRepository answerRepository, TaskRepository taskRepository,
                              ResultRepository resultRepository){
        this.answerRepository = answerRepository;
        this.taskRepository = taskRepository;
        this.resultRepository = resultRepository;
    }
    @Transactional
    @Override
    public void addUserAnswer(String userAnswer, String taskId, String userId) {
        List<Answer> answers = answerRepository.findAll(); //написать метод для репозитория
        String rightAnswer = taskRepository.findRightAnswerById(taskId);

        Answer answer = answers.stream()
                .filter(answer1 -> answer1.getUser().getId().equals(userId))
                .filter(answer1 -> answer1.getTask().getId().equals(taskId))
                .findAny()
                .orElse(null);
        assert answer != null;
        answer.setUserAnswer(userAnswer);
        answerRepository.save(answer); //сохранили ответ

        //теперь сравниваем с правильным ответом и записываем результат
        Result result = resultRepository.findResultsByAnswerId(answer.getId()).getFirst();

        if(userAnswer.equals(rightAnswer)){
            result.setResult(1.0);
        }
        else {
            result.setResult(0.0);
        }

        resultRepository.save(result);
    }
}
