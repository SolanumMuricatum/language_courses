package com.courses.backend.service.user;

import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.user.User;
import com.courses.backend.model.user.UserDTO;

import java.util.List;
import java.util.Map;

public interface UserService {
    public Map<String, String> getUserRole(String email, String password);

    public List<UserDTO> getUserScore();

    public List<User> getTeacher();
    public List<User> getAllUsers();
    public void addUser(User user);

    public void deleteUser(String id);

    public List<User> findUserForUpdate(String id);
    public void saveUser(User user);
    public List<User> getOnlyUsers(String courseId);
    public List<User> getUsersWithoutSubscription(String courseId);
}
