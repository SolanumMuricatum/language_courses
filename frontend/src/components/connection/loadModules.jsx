import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const ModuleLoader = ({ setModules }) => {
  const { id } = useParams(); // Получаем id из параметров маршрута
  useEffect(() => {
    setModules([]); // Очищаем старые данные
    const fetchModules = async () => {
      try {
        let response = await fetch(`http://localhost:8080/module/getAll/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные модули:', data);
        setModules(data);
      } catch (error) {
        console.error('Ошибка при получении курсов:', error);
      }
    };

    fetchModules();
  }, [id, setModules]); // Передаем setCourses как зависимость

  return null;
};
