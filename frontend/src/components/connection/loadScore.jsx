// CourseLoader.js
import { useEffect } from 'react';

export const ScoreLoader = ({setScore}) => {
  //тут можно сделать автоматический перезапрос каждые там полминуты + тогда нужно ли очищать статус??..
  useEffect(() => {
    const fetchScore = async () => {
      try {
        let response = await fetch(`http://localhost:8080/users/getScore`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученный рейтинг:', data);
        setScore(data);
      } catch (error) {
        console.error('Ошибка при получении рейтинга:', error);
      }
    };

    fetchScore();
  }, [setScore]); // Передаем setCourses как зависимость

  return null; // Этот компонент ничего не рендерит
};