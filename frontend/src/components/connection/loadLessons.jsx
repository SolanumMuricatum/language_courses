import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const LessonLoader = ({ setLessons }) => {
  const { module_id, user_id } = useParams(); // Получаем id из параметров маршрута
  useEffect(() => {
    setLessons([]); // Очищаем старые данные
    const fetchLessons = async () => {
      try {
        let response = await fetch(`http://localhost:8080/lesson/getAll/${module_id}/${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные уроки', data);
        setLessons(data);
      } catch (error) {
        console.error('Ошибка при получении уроков:', error);
      }
    };

    fetchLessons();
  }, [module_id, user_id, setLessons]); // Передаем setCourses как зависимость

  return null;
};
