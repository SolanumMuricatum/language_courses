package com.courses.backend.service.task;

import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;

import java.util.List;

public interface TaskService {
    public List<TaskDTO> getAllTasks(String lessonId, String userId);
    public String findRightAnswerById(String taskId);
}
