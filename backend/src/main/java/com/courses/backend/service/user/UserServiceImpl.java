package com.courses.backend.service.user;

import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.user.User;
import com.courses.backend.repository.ModuleRepository;
import com.courses.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl (UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public Map<String, String> getUserRole(String email, String password) {
        List<User> users = userRepository.findAll();

        User foundUser = users.stream()
                .filter(user -> user.getEmail().equals(email) && user.getPassword().equals(password))
                .findFirst()
                .orElse(null);

        if (foundUser != null) {
            return Map.of("role",foundUser.getRole(),"id", String.valueOf(foundUser.getId()), "user_name", foundUser.getName(), "user_surname", foundUser.getSurname());
        } else {
            return Map.of("error", "Неверный логин или пароль");
        }
    }
}
