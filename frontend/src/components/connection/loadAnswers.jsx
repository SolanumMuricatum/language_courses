// CourseLoader.js
import React, { useEffect } from 'react';

export const AnswerLoader = ({ setCourses , lesson_id}) => {
  //тут можно сделать автоматический перезапрос каждые там полминуты + тогда нужно ли очищать статус??..
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await fetch(`http://localhost:8080/course/getAll/${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные курсы:', data);
        setCourses(data);
      } catch (error) {
        console.error('Ошибка при получении курсов:', error);
      }
    };

    fetchCourses();
  }, [setCourses]); // Передаем setCourses как зависимость

  return null; // Этот компонент ничего не рендерит
};