package com.courses.backend.model.user;

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
@Table(name = "usercourses")
public class User {
    @Id
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
}
