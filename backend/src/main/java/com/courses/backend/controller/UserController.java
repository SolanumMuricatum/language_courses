package com.courses.backend.controller;

import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.lesson.LessonMark;
import com.courses.backend.model.task.Task;
import com.courses.backend.model.task.TaskDTO;
import com.courses.backend.model.user.User;
import com.courses.backend.model.user.UserDTO;
import com.courses.backend.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> enterUser(@RequestBody User user){
        return new ResponseEntity<>(userService.getUserRole(user.getEmail(), user.getPassword()), HttpStatus.OK);
    }

    @GetMapping(value = "getScore")
    public ResponseEntity<List<UserDTO>> getUserScore(){
        return new ResponseEntity<>(userService.getUserScore(), HttpStatus.OK);
    }

    @GetMapping(value = "getTeacher")
    public ResponseEntity<List<User>> getTeacher(){
        return new ResponseEntity<>(userService.getTeacher(), HttpStatus.OK);
    }

    @GetMapping(value = "getAll")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping(value = "getOnlyUsers/{course_id}")
    public ResponseEntity<List<User>> getOnlyUsers(@PathVariable(value = "course_id") String courseId){
        return new ResponseEntity<>(userService.getOnlyUsers(courseId), HttpStatus.OK);
    }

    @GetMapping(value = "getUsersWithoutSubscription/{course_id}")
    public ResponseEntity<List<User>> getUsersWithoutSubscription(@PathVariable(value = "course_id") String courseId){
        return new ResponseEntity<>(userService.getUsersWithoutSubscription(courseId), HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addUser(@RequestBody Map<String, String> data) {
        String email = data.get("email"); // Получаем почту из входящих данных

        boolean emailExists = userService.getAllUsers().stream()
                .anyMatch(user -> user.getEmail().equals(email));

        if (emailExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Пользователь с такой почтой уже существует.");
        }

        User lastUser = null;

        try {
            lastUser = userService.getAllUsers().getLast();
        } catch (NoSuchElementException ignored) {
        }

        int id;

        if (lastUser != null) {
            id = Integer.parseInt(String.valueOf(lastUser.getId())) + 1;
            System.out.println(id);
        } else {
            id = 1;
        }

        // Логика сохранения нового пользователя
        User newUser = new User(String.valueOf(id), data.get("name"), data.get("surname"), email, data.get("password"), data.get("role"));
        userService.addUser(newUser); // Предполагается, что у вас есть метод для добавления пользователя

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/getUserForUpdate/{id}")
    public ResponseEntity<List<User>> getUserForUpdate(@PathVariable(value = "id") String id){
        return new ResponseEntity<>(userService.findUserForUpdate(id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") String id){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> userForUpdate, @PathVariable(value = "id") String userId){

        String email = userForUpdate.get("email"); // Получаем почту из входящих данных
        User oldUser = userService.findUserForUpdate(userId).getFirst();

        boolean emailExists = userService.getAllUsers().stream()
                .anyMatch(user -> user.getEmail().equals(email));

        if (emailExists && !userForUpdate.get("email").equals(oldUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Пользователь с такой почтой уже существует.");
        }
        else{

            User user = new User(userId, userForUpdate.get("name"), userForUpdate.get("surname"), userForUpdate.get("email"), userForUpdate.get("password"), userForUpdate.get("role"));

            userService.saveUser(user);

            return new ResponseEntity<>(HttpStatus.OK);

        }
    }
}
