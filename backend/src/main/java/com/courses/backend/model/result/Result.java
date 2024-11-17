package com.courses.backend.model.result;

import com.courses.backend.model.answer.Answer;
import com.courses.backend.model.course.Course;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "result", columnDefinition = "DOUBLE PRECISION")
    private Double result;

    @OneToOne // Связь "многие к одному"
    @JsonManagedReference
    @JoinColumn(name = "answer_id") // Указывает на внешний ключ в таблице
    private Answer answer;
}
