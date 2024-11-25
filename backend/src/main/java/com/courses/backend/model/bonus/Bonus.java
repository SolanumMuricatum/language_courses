package com.courses.backend.model.bonus;

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
@Table(name = "bonus")
public class Bonus {
    @EmbeddedId
    private LessonUserId lessonUserId;

    @Column(name = "point", columnDefinition = "INTEGER")
    private Integer point;
}