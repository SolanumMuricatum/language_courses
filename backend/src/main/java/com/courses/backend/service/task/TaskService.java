package com.courses.backend.service.task;

import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;

import java.util.List;

public interface TaskService {
    public List<TaskDTO> getAllTasks(String lessonId);
    public List<TaskDTO> getTasks(String lessonId, String userId);
    public String findRightAnswerById(String taskId);
    public void saveTask(Task task);
    public void deleteTask(String id);
    public List<Task> findTaskForUpdate(String id);
}
