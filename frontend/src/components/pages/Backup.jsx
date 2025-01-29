import React, { useEffect, useState } from 'react';
import { deleteTask } from '../connection/task/deleteTask';
import { postBackup } from '../connection/postBackup';
import { Button } from '../elements/Button';

export function Backup() {

  const [hovered, setHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role'); // Получаем роль как строку
    setIsDisabled(role === null); // Устанавливаем состояние неактивности кнопки
  }, []);

  const handleBackup = async () => {
    try {
      const statusCode = await postBackup(); // Вызов функции
      
      if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.")
      } 
      else{
        alert("Резервная копия бд успешно сохранена");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.")
    }
  };

  const buttonStyle = {
    backgroundColor: hovered ? '#45a049' : '#4CAF50', 
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: isDisabled ? 'not-allowed' : 'pointer', 
    transition: 'background-color 0.3s ease',
    opacity: isDisabled ? 0.6 : 1,
  };

  return (
    <>
    <div style={{marginTop: '300px'}}>
      <button
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)} 
        disabled={isDisabled} 
        onClick={handleBackup}
      >
        Сделать резервное копирование
      </button>
    </div>
    </>
  );
}