import React, { useState, useEffect } from 'react';

export function Button({ text }) {
  const [hovered, setHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role'); // Получаем роль как строку
    setIsDisabled(role === null); // Устанавливаем состояние неактивности кнопки
  }, []);

  const buttonStyle = {
    backgroundColor: hovered ? '#45a049' : '#4CAF50', // Меняет цвет при наведении
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: isDisabled ? 'not-allowed' : 'pointer', // Изменяет курсор на not-allowed если кнопка неактивна
    transition: 'background-color 0.3s ease',
    opacity: isDisabled ? 0.6 : 1, // Изменяет прозрачность для визуального эффекта
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)} // Устанавливает состояние при наведении
      onMouseLeave={() => setHovered(false)} // Сбрасывает состояние при уходе
      disabled={isDisabled} // Устанавливает состояние кнопки
    >
      {text}
    </button>
  );
}