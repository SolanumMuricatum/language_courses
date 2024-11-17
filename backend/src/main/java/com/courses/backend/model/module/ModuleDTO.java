package com.courses.backend.model.module;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModuleDTO {
    private String id;
    private String name;
    private String description;
    private String courseId;
    private String courseName;
}