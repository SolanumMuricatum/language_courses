import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../elements/Button';
import { CourseLoader } from '../connection/loadCourses';

export function CoursePage({ courses, setCourses, user_id, user_name, user_surname }) {
  return (
    <>
    <CourseLoader setCourses={setCourses} user_id={user_id}/>
      <div style={{ paddingBottom: '50px' }}>
        <h1>{user_name === 0 ? "Наши курсы" : `Здравствуйте, ${user_name} ${user_surname}`}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', maxWidth: '1200px', justifyContent: 'center', margin: '0 auto' ,overflowY: 'auto'}}>
          {courses.map((course, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '300px', height: 'auto' }}>
              <h2>{course.name}</h2>
              <img src={`${process.env.PUBLIC_URL}/${course.image}`} style={{ border: "2px solid #000000", width: '100px', height: '100px', borderRadius: '5px' }} />
              <p>{course.description}</p>
              <h3>Учитель: {course.teacher_name} {course.teacher_surname}</h3>
              <p style={{marginTop: '20px'}}>Рейтинг:</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: star <= course.rating ? 'gold' : 'gray',
                        cursor: 'default',
                        fontSize: '24px', // размер звёздочек, можете изменить по желанию
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <Link to={`/modules/${course.id}`}>
                  <Button text='Перейти к модулям' backgroundColor="#4CAF50" hoverColor="#45a049" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}