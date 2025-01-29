package com.courses.backend.service.module;

import com.courses.backend.model.module.Module;
import com.courses.backend.model.module.ModuleDTO;
import com.courses.backend.repository.CoursesRepository;
import com.courses.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleServiceImpl implements ModuleService{
    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleServiceImpl (ModuleRepository moduleRepository){
        this.moduleRepository = moduleRepository;
    }


    @Override
    public void saveModule(Module module) {
        moduleRepository.save(module);
    }

    @Override
    public List<ModuleDTO> getAllModules(String id) {
        List<ModuleDTO> modules = moduleRepository.findAllModules();
        return modules.stream()
                .filter(module -> module.getCourseId().equals(id)) // Фильтрация по заданному id
                .sorted(Comparator.comparing(ModuleDTO::getId)) // Сортировка по courseId
                .collect(Collectors.toList());
    }

    @Override
    public List<ModuleDTO> findModuleForUpdate(String id){
        return moduleRepository.findModuleForUpdate(id);
    }

    @Override
    public void deleteModule(String id) {
        moduleRepository.delete(moduleRepository.getReferenceById(id));
    }

    @Override
    public void updateModule(Module module) {

    }
}
