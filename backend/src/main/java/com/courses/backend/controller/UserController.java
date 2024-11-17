package com.courses.backend.controller;

import com.courses.backend.model.user.User;
import com.courses.backend.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
