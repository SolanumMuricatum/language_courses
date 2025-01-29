package com.courses.backend.model.course;
import com.courses.backend.model.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "course")
public class Course {

    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "name", columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(name = "description", columnDefinition = "VARCHAR(50)")
    private String description;
    @Column(name = "rating", columnDefinition = "DOUBLE")
    private Double rating;
    @Column(name = "image", columnDefinition = "TEXT")
    private String image;

    @ManyToOne // Связь "многие к одному"
    @JsonManagedReference
    @JoinColumn(name = "teacher_id") // Указывает на внешний ключ в таблице
    private User teacher;

/*    @ManyToMany
    @JoinTable(
            name = "course_registration",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;*/
   /* @ManyToMany(mappedBy = "courses") // Связь с пользователями (обратная сторона)
    private Set<User> users; // Связь с пользователями*/


}
