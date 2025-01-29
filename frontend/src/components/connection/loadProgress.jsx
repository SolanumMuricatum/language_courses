// CourseLoader.js
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ProgressLoader = ({setProgress}) => {
  const { lesson_id } = useParams();
  //тут можно сделать автоматический перезапрос каждые там полминуты + тогда нужно ли очищать статус??..
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        let response = await fetch(`http://localhost:8080/lesson/mark/getProgress/${lesson_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученный прогресс по урокам:', data);
        setProgress(data);
      } catch (error) {
        console.error('Ошибка при получении прогресса по урокам:', error);
      }
    };

    fetchProgress();
  }, [setProgress]); // Передаем setCourses как зависимость

  return null; // Этот компонент ничего не рендерит
};