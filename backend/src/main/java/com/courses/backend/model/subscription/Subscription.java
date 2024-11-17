package com.courses.backend.model.subscription;

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
@Table(name = "course_registration")
public class Subscription {
   @EmbeddedId
   private CourseUserId courseUserId;
}