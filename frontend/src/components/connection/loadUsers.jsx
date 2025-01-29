import { useEffect } from 'react';

export const UserLoader = ({ setUsers }) => {
  useEffect(() => {
    setUsers([]); // Очищаем старые данные
    const fetchUsers = async () => {
      try {
        let response = await fetch(`http://localhost:8080/users/getAll`);
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
