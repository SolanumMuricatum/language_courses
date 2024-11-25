package com.courses.backend.model.lesson;

import com.courses.backend.model.bonus.LessonUserId;
import com.courses.backend.model.course.Course;
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
@Table(name = "lesson_mark")
public class LessonMark {
    @EmbeddedId
    private LessonUserId lessonUserId;

    @Column(name = "mark", columnDefinition = "VARCHAR(225)")
    private String mark;
}