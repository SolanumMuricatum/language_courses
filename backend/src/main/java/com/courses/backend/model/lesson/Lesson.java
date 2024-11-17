package com.courses.backend.model.lesson;

import com.courses.backend.model.module.Module;
import com.courses.backend.model.task.Task;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "lesson")
public class Lesson {
    @Id
    @Column(name = "id")
    private String id; // Если id строка и задается вручную

    @Column(name = "name", columnDefinition = "VARCHAR(225)")
    private String name;

    @Column(name = "description", columnDefinition = "VARCHAR(225)")
    private String description;

    @Column(name = "mark", columnDefinition = "DOUBLE PRECISION")
    private Double mark;

    @ManyToOne // Связь "многие к одному"
    @JsonManagedReference
    @JoinColumn(name = "module_id") // Указывает на внешний ключ в таблице
    private Module module;

    @OneToMany(mappedBy = "lesson") // Обратная связь с Task
    @JsonBackReference
    private Set<Task> task = new HashSet<>(); // Инициализация коллекции

    public Lesson(String id, String name, String description, double mark, Module module) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.mark = mark;
        this.module = module;
    }
}