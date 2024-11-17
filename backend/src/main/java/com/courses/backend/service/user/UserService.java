package com.courses.backend.service.user;

import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.model.user.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    public Map<String, String> getUserRole(String email, String password);
}
