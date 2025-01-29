import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export const UsersOnlyLoader = ({ setUsers }) => {
  const { course_id } = useParams();
  useEffect(() => {
    setUsers([]); // Очищаем старые данные
    const fetchUsers = async () => {
      try {
        let response = await fetch(`http://localhost:8080/users/getOnlyUsers/${course_id}`);
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
  }, [setUsers]); // Передаем setCourses как зависимость

  return null;
};
