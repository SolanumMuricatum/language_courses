import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const TaskLoader = ({ setTasks }) => {
  const { lesson_id, user_id } = useParams(); // Получаем id из параметров маршрута
  useEffect(() => {
    setTasks([]); // Очищаем старые данные
    const fetchTasks = async () => {
      try {
        let response = await fetch(`http://localhost:8080/task/getAll/${lesson_id}/${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные задания', data);
        setTasks(data);
      } catch (error) {
        console.error('Ошибка при получении заданий:', error);
      }
    };

    fetchTasks();
  }, [lesson_id, user_id, setTasks]); // Передаем setCourses как зависимость

  return null;
};
