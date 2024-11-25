import React, { useState } from 'react';
import './styles/LoginPage.css'; // Убедитесь, что вы импортируете файл стилей
import { authorization } from '../connection/authorization';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

export function LoginPage({ changeRole }) {
  const [login, setLogin] = useState(''); // Состояние для логина
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [error, setError] = useState(''); // Состояние для ошибок
  const navigate = useNavigate(); // Инициализация navigate

  const handleSubmit = async (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    console.log('Перед вызовом Authorization:', login, password); // Логируем перед вызовом
  
    try {
      const data = await authorization(login, password); // Вызов функции
      console.log('Response data:', data); // Логируем ответ сервера

      if (data.error) {
        setError(data.error); // Устанавливаем сообщение об ошибке
      } else if (data.role) {
        localStorage.setItem('role', JSON.stringify(data.role)); // Сохраняем роль в localStorage
        localStorage.setItem('user_id', JSON.stringify(data.id));
        localStorage.setItem('user_name', JSON.stringify(data.user_name)); 
        localStorage.setItem('user_surname', JSON.stringify(data.user_surname));
        console.log("Users id:" + data.id);
        setError(''); // Очищаем сообщение об ошибке
        changeRole(data.role); // Изменяем роль
        console.log('User role:', data.role);
        navigate('/courses'); // Переход на главную страницу
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setError('Произошла ошибка при авторизации. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleInputChange = (event) => {
    setError(''); // Очищаем сообщение об ошибке при изменении любого поля
    const { name, value } = event.target;
    if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className='main-container'>
      <div className="container">
        <div className="login-form">
          <div className="title">Личный кабинет</div>
          <form onSubmit={handleSubmit}>
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  name="login" // Добавляем атрибут name
                  placeholder="Введите email"
                  value={login}
                  onChange={handleInputChange} // Обновляем состояние при изменении
                  required
                />
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password" // Добавляем атрибут name
                  placeholder="Введите пароль"
                  value={password}
                  onChange={handleInputChange} // Обновляем состояние при изменении
                  required
                />
              </div>
              {error && <div style={{ color: 'red' }}>{error}</div>} {/* Выводим сообщение об ошибке */}
              <div className="text"><a href="#">Забыли пароль?</a></div>
              <div className="button input-box">
                <input 
                  type="submit" 
                  value="Войти" 
                />
              </div>
              <div className="text sign-up-text">
                Не зарегистрированы? <a href="#">Оставьте заявку на регистрацию</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}