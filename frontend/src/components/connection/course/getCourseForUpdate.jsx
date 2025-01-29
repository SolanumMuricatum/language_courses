import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const GetCourseForUpdate = ({setCourses}) => {
  const { course_id } = useParams(); // Получаем id из параметров маршрута
  useEffect(() => {
    setCourses([]); // Очищаем старые данные
    const fetchCourses = async () => {
      try {
        let response = await fetch(`http://localhost:8080/course/getCourseForUpdate/${course_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные модули:', data);
        setCourses(data);
      } catch (error) {
        console.error('Ошибка при получении курсов:', error);
      }
    };

    fetchCourses();
  }, [course_id, setCourses]); // Передаем setCourses как зависимость

  return null;
};
