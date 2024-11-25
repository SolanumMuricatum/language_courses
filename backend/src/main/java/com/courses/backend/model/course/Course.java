package com.courses.backend.model.course;
import com.courses.backend.model.user.User;
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
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;
    @Column(name = "name", columnDefinition = "VARCHAR(50)")
    private String name;
    @Column(name = "description", columnDefinition = "VARCHAR(50)")
    private String description;
    @Column(name = "rating", columnDefinition = "DOUBLE")
    private Double rating;
    /*@Column(name = "start_of_the_course", columnDefinition = "VARCHAR(10)")
    private String start_of_the_course;
    @Column(name = "end_of_the_course", columnDefinition = "VARCHAR(10)")
    private String end_of_the_course;
    @Column(name = "price", columnDefinition = "NUMERIC(10, 2)")
    private String price;
    @Column(name = "currency_code", columnDefinition = "VARCHAR(3)")
    private String currency_code;*/
    @Column(name = "image", columnDefinition = "VARCHAR(50)")
    private String image;

    @ManyToOne // Связь "многие к одному"
    @JsonManagedReference
    @JoinColumn(name = "teacher_id") // Указывает на внешний ключ в таблице
    private User teacher;

   /* @ManyToMany(mappedBy = "courses") // Связь с пользователями (обратная сторона)
    private Set<User> users; // Связь с пользователями*/

}
