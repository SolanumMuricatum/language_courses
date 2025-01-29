import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const GetTaskForUpdate = ({setTasks}) => {
  const { task_id } = useParams(); // Получаем id из параметров маршрута
  useEffect(() => {
    setTasks([]); // Очищаем старые данные
    const fetchModules = async () => {
      try {
        let response = await fetch(`http://localhost:8080/task/getTaskForUpdate/${task_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные уроки:', data);
        setTasks(data);
      } catch (error) {
        console.error('Ошибка при получении заданий:', error);
      }
    };

    fetchModules();
  }, [task_id, setTasks]); // Передаем setCourses как зависимость

  return null;
};
