package com.courses.backend.service.module;

import com.courses.backend.model.course.Course;
import com.courses.backend.model.course.CourseDTO;
import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;

import java.util.List;

public interface ModuleService {
    public void saveModule(Module module);
    public List<ModuleDTO> getAllModules(String id);
    public void deleteModule(String id);
    public List<ModuleDTO> findModuleForUpdate(String id);

    public void updateModule(Module module);
}
