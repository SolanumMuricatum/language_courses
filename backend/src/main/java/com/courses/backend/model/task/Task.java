package com.courses.backend.model.task;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.lesson.Lesson;
import com.courses.backend.model.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "task")
public class Task {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "name", columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(name = "description", columnDefinition = "VARCHAR(225)")
    private String description;
    @Column(name = "right_answer", columnDefinition = "VARCHAR(225)")
    private String right_answer;

    @ManyToOne // Связь "многие к одному"
    @JoinColumn(name = "lesson_id") // Указывает на внешний ключ в таблице
    @JsonManagedReference
    private Lesson lesson;

    @OneToMany(mappedBy = "task") // Обратная связь с Answer
    @JsonBackReference
    private Set<Answer> answer; // Или List<Task> в зависимости от ваших потребностей

}
