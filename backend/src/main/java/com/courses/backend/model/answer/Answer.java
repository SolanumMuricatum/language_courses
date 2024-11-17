package com.courses.backend.model.answer;

import com.courses.backend.model.module.Module;
import com.courses.backend.model.result.Result;
import com.courses.backend.model.task.Task;
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
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "user_answer", columnDefinition = "VARCHAR(225)")
    private String userAnswer;
    @Column(name = "right_answer", columnDefinition = "VARCHAR(225)")
    private String rightAnswer;

    @ManyToOne // Связь "многие к одному"
    @JsonManagedReference
    @JoinColumn(name = "task_id") // Указывает на внешний ключ в таблице
    private Task task;

    @ManyToOne // Связь "многие к одному"
    @JsonManagedReference
    @JoinColumn(name = "user_id") // Указывает на внешний ключ в таблице
    private User user;

    @OneToOne(mappedBy = "answer", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Обратная связь с result
    @JsonBackReference
    private Result result;

}
