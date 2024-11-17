package com.courses.backend.model.task;

import com.courses.backend.model.answer.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskDTO {
    private String id;
    private String name;
    private String description;
    private String rightAnswer;
    private String lessonId;
    private String UserAnswer;
    private Double result;
}
