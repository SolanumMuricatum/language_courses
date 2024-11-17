package com.courses.backend.model.user;

import com.courses.backend.model.course.Course;
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
@Table(name = "usercourses")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;
    @Column(name = "name", columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(name = "surname", columnDefinition = "VARCHAR(50)")
    private String surname;
    @Column(name = "email", columnDefinition = "VARCHAR(50)")
    private String email;
    @Column(name = "password", columnDefinition = "VARCHAR(50)")
    private String password;
    @Column(name = "role", columnDefinition = "VARCHAR(50)")
    private String role;

    /*@ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "course_registration", // Имя связующей таблицы
            joinColumns = @JoinColumn(name = "user_id"), // Внешний ключ для пользователя
            inverseJoinColumns = @JoinColumn(name = "course_id") // Внешний ключ для курса
    )
    private Set<Course> courses; // Связь с курсами*/
}
