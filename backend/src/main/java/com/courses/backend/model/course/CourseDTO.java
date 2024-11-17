package com.courses.backend.model.course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private String id;
    private String name;
    private String description;
    /*private String start_of_the_course;
    private String end_of_the_course;*/
    private String teacher_id;
    /*private String price;
    private String currency_code;*/
    private String image;
    private String teacher_name;
    private String teacher_surname;

}
