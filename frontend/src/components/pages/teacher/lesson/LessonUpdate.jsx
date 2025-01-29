import React, { useEffect, useState } from 'react';
import { Button } from '../../../elements/Button';
import { GetLessonForUpdate } from '../../../connection/lesson/getLessonForUpdate';
import { updateLesson } from '../../../connection/lesson/updateLesson';

export function LessonUpdate({ lessons, setLessons }) {
  const [lesson, setLesson] = useState({ name: '', description: '' });

  // Эффект для получения модуля при загрузке
  useEffect(() => {
    if (lessons.length > 0) {
      console.log(lessons);
      setLesson(lessons[0]); // Предполагаем, что приходит только один модуль
    }
  }, [lessons]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson(prevModule => ({
      ...prevModule,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(lesson.moduleId + "kxwmxkwm");
      const statusCode = await updateLesson(lesson.module.id, lesson.id, lesson.name, lesson.description); // Вызов функции

      if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.");
      } else {
        alert("Урок успешно обновлён.");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <>
      <GetLessonForUpdate setLessons={setLessons} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          maxWidth: '1200px',
          justifyContent: 'center',
          margin: '0 auto',
          paddingTop: '120px'
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '500px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '10px'
          }}
        >
          <form onSubmit={handleSubmit}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name" style={{ fontStyle: 'inherit' }}>Название</label>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        marginTop: '10px',
                        width: '50%',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="name"
                      id="name"
                      value={lesson.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="description" style={{ fontStyle: 'inherit' }}>Описание</label>
                    <input
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '50%',
                        marginTop: '10px',
                        height: '30px',
                        fontSize: '16px',
                        border: `3px solid black`,
                      }}
                      type="text"
                      name="description"
                      id="description"
                      value={lesson.description}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '10px', marginTop: '150px' }}>
              <Button
                type="submit"
                text="Сохранить изменения"
                backgroundColor="#4CAF50"
                hoverColor="#45a049"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}