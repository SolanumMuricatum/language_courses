import React from 'react';
import { LessonLoader } from '../connection/loadLessons';
import { Link } from 'react-router-dom';
import { Button } from '../elements/Button';

export function LessonPage({ lessons, setLessons }) {
  const userId = JSON.parse(localStorage.getItem('user_id'));
  return (
    <>
      <LessonLoader setLessons={setLessons} />
      <div style={{ paddingBottom: '50px' }}>
        <h1>Уроки модуля</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            maxWidth: '1200px',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {lessons.map((lesson, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '300px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', paddingTop: '10px', flex: '1' }}>
                {/* <h2>{lesson.course_name}</h2> */}
                <h2>{lesson.name}</h2>
                <p style={{ flexGrow: 1 }}>{lesson.description}</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div style={{position: 'absolute', bottom: '0px', width: '100%'}}>
                  <p>Урок выполнен правильно на {lesson.mark}%</p>
                </div>
              </div>
              <div style={{ padding: '10px', marginBottom: '20px' }}>
                <Link  to={`/tasks/${lesson.id}/${userId}`}>
                  <Button text='Перейти к заданиям' backgroundColor="#4CAF50" hoverColor="#45a049" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}