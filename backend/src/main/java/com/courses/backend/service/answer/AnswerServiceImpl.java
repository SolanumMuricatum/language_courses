package com.courses.backend.service.answer;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.result.Result;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.model.user.User;
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
        String rightAnswer = taskRepository.findRightAnswerById(taskId);

        List<Answer> existingAnswers = answerRepository.findUserAnswer(userId, taskId);
        Answer checkIfExistsAnswer = existingAnswers.isEmpty() ? null : existingAnswers.get(0);

        Task task = new Task();
        task.setId(taskId);

        User user = new User();
        user.setId(userId);

        Answer answer = new Answer();
        answer.setUserAnswer(userAnswer);
        answer.setTask(task);
        answer.setUser(user);

        if (checkIfExistsAnswer != null) {
            answer.setId(checkIfExistsAnswer.getId());
            System.out.println(checkIfExistsAnswer.getResult().getResult());
        }

        answerRepository.save(answer);

        Result result = new Result();
        result.setAnswer(answer);

        if (userAnswer.equals(rightAnswer)) {
            result.setResult(1.0);
        } else {
            result.setResult(0.0);
        }

        List<Result> existingResults = resultRepository.findResultsByAnswerId(answer.getId());
        Result checkIfExistsResult = existingResults.isEmpty() ? null : existingResults.get(0);

        if (checkIfExistsResult != null) {
            result.setId(checkIfExistsResult.getId());
        }

        resultRepository.save(result);
    }
}
