import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const GetUserForUpdate = ({setUsers}) => {
  const { user_id } = useParams(); // Получаем id из параметров маршрута
  useEffect(() => {
    setUsers([]); // Очищаем старые данные
    const fetchUsers = async () => {
      try {
        let response = await fetch(`http://localhost:8080/users/getUserForUpdate/${user_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json(); // Получаем данные только один раз
        console.log('Полученные пользователи:', data);
        setUsers(data);
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    };

    fetchUsers();
  }, [user_id, setUsers]); // Передаем setCourses как зависимость

  return null;
};
