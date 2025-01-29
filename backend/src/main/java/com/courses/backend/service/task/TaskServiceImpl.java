package com.courses.backend.service.task;

import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.repository.ModuleRepository;
import com.courses.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService{

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<TaskDTO> getAllTasks(String lessonId) {
        return taskRepository.findAllTasks(lessonId);
    }

    @Override
    public List<TaskDTO> getTasks(String lessonId, String userId) {
        List<TaskDTO> tasks = taskRepository.findTasks(lessonId, userId);
        return tasks.stream()
                .sorted(Comparator.comparing(TaskDTO::getId)) // Сортировка по courseId
                .collect(Collectors.toList());
    }

    @Override
    public String findRightAnswerById(String taskId){
       return taskRepository.findRightAnswerById(taskId);
    }

    @Override
    public void saveTask(Task task) {
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(String id) {
        taskRepository.delete(taskRepository.getReferenceById(id));
    }

    @Override
    public List<Task> findTaskForUpdate(String id) {
        return taskRepository.findTaskForUpdate(id);
    }

}
