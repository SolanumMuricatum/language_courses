import React, { useState } from 'react';
import './styles/Rating.css'; // Импортируем стили
import { Button } from '../elements/Button';
import { Link } from 'react-router-dom';
import { InputScoreSubmit } from '../elements/InputScoreSubmit';
import { CourseLoader } from '../connection/loadCourses'; // Предполагается, что это существующий компонент
import { postRating } from '../connection/postRating';

export function RatingPage({ courses, setCourses, user_id }) {
  const [rating, setRating] = useState(0); // Текущая оценка
  const [hoverRating, setHoverRating] = useState(0); // Оценка при наведении
  const [courseId, setCourseId] = useState(null); // Идентификатор курса
  const [errorMessage, setErrorMessage] = useState(''); // Сообщение об ошибке

  const handleSubmit = async (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    if (!courseId) {
      setErrorMessage('Пожалуйста, выберите курс.'); // Установка сообщения об ошибке
      return;
    }
    if (rating === 0) {
      setErrorMessage('Пожалуйста, выберите оценку.'); // Установка сообщения об ошибке
      return;
    }

    try {
      const statusCode = await postRating(courseId, rating, user_id); // Вызов функции

      if (statusCode && statusCode !== 201) {
        setErrorMessage('Ошибка при отправке оценки. Пожалуйста, попробуйте еще раз.'); // Установка сообщения об ошибке
      } else {
        alert("Спасибо за оценку курса!")
        window.location.reload(); // Перезагрузка страницы после успешного поста
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      setErrorMessage('Ошибка при подключении к серверу. Пожалуйста, проверьте ваше соединение.'); // Установка сообщения об ошибке
    }
  };

  const handleClick = (rating) => {
    setRating(rating); // Устанавливаем выбранную оценку
    setErrorMessage(''); // Очищаем сообщение об ошибке
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value); // Обновляем оценку при наведении
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Сбрасываем hoverRating при уходе курсора
  };

  const handleSelectedCourse = (event) => {
    const selectedCourseId = event.target.value; // Получаем идентификатор курса из value
    const selectedCourse = courses.find(course => course.id === selectedCourseId); // Находим курс по id

    setCourseId(selectedCourseId); // Обновляем состояние выбранного элемента
    setRating(selectedCourse.rating || 0); // Устанавливаем рейтинг курса
    setErrorMessage(''); // Очищаем сообщение об ошибке
  };

  const styles = {
    dropdownContainer: {
      margin: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    select: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #4CAF50',
      borderRadius: '5px',
      backgroundColor: 'white',
      color: '#333',
      cursor: 'pointer',
      transition: 'border-color 0.3s',
    },
    selectHover: {
      borderColor: '#45a049',
    },
    errorMessage: {
      color: 'red',
      marginTop: '10px',
      fontWeight: 'bold',
    },
  };

  return (
    <>
      <CourseLoader setCourses={setCourses} user_id={user_id} />
      <div style={{ paddingTop: '200px' }}>
        <form onSubmit={handleSubmit}>
          <h3>Пожалуйста, выберите доступный вам курс</h3>
          <div style={styles.dropdownContainer}>
            <select
              value={courseId || ''} // Убедитесь, что это значение корректно
              onChange={handleSelectedCourse} // Обработчик выбора курса
              style={styles.select}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = styles.selectHover.borderColor)}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = '#4CAF50')}
            >
              <option value="" disabled>Выберите курс</option> {/* Placeholder */}
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="rating" onMouseLeave={handleMouseLeave} style={{ paddingBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'selected' : ''}`}
                  onClick={() => handleClick(star)} // Обрабатываем клик
                  onMouseEnter={() => handleMouseEnter(star)} // Обрабатываем наведение
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <InputScoreSubmit />
        </form>
      </div>
    </>
  );
}