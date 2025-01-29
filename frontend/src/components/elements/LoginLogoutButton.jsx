import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AppBarButtonFunction({ role, changeRole }) {
  const navigate = useNavigate(); // Инициализация navigate

  const handleClick = () => {
    const storedRole = localStorage.getItem('role');

    if (!storedRole) { // Проверяем, существует ли роль
      navigate('/login'); 
    } else {
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_surname'); // Удаляем роль и айди и всё остальное из localStorage
      changeRole(null); // Устанавливаем роль в undefined
      navigate('/'); //reload page
    }
  };

  const buttonStyle = {
    color: 'white',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      {role === null ? 'Login' : 'Logout'} {/* Используем строгую проверку */}
    </button>
  );
}