import React, { useState, useEffect } from 'react';

export function InputSubmit({userAnswer}){
  const [hovered, setHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); // Установите в true, чтобы сделать кнопку неактивной

  useEffect(() => {
    setIsDisabled(userAnswer); // Устанавливаем состояние неактивности кнопки
  }, []);

  const buttonStyle = {
    backgroundColor: hovered ? '#45a049' : '#4CAF50', // Меняет цвет при наведении
    marginTop: '10px',
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
    <input
      type="submit"
      value="    Проверить   "
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={isDisabled} // Делаем кнопку неактивной в зависимости от состояния
    />
  );
};
