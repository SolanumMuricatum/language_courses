import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate
import { useParams } from 'react-router-dom';
//import { useState } from 'react';
//import { ModuleLoader } from '../connection/loadModules';
//import { Button } from '../elements/Button';
import { Link } from 'react-router-dom';
//import { deleteModule } from '../connection/users/deleteModule';
//import { FaPlus } from 'react-icons/fa';
import { UserLoader } from '../../connection/loadUsers';
import { FaPlus } from 'react-icons/fa';
import { deleteUser } from '../../connection/user/deleteUser';
import { UsersOnlyLoader } from '../../connection/loadOnlyUsers';
import { deleteUserSubscription } from '../../connection/user/deleteUserSubscription';

export function CourseAccess({ users, setUsers }) {
  const navigate = useNavigate(); // Инициализация navigate для навигации
  
  const { course_id } = useParams();

  const handleSelectChange = (userId, action) => {
    switch (action) {
      case 'delete':
        if (window.confirm('Вы уверены, что хотите удалить подписку этого пользователя?')) {
          handleDelete(userId, course_id); // Если пользователь подтвердил, вызываем handleDelete
          window.location.reload();
        }
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    navigate(`/add/access/${course_id}`); // Передача userId в путь редактирования
  };

  const handleDelete = async (userId, course_id) => {
    try {
      const statusCode = await deleteUserSubscription(userId, course_id); // Вызов функции
      
      if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.")
      } 
      else{
        alert("Подписка пользователя успешно удалена");
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      alert("Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.")
    }
  };
  
  const styles = {
    dropdownContainer: {
      margin: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    select: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #4CAF50',
      borderRadius: '5px',
      backgroundColor: 'white',
      color: '#333',
      cursor: 'pointer',
      transition: 'border-color 0.3s',
    },
    selectHover: {
      borderColor: '#45a049',
    }
  };
  

  return (
    <>
      <UsersOnlyLoader setUsers={setUsers} />
      <div style={{ paddingBottom: '50px' }}>
        <h1>Пользователи</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            maxWidth: '1200px',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {users.map((user, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '300px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ padding: '10px', flex: '1' }}>
                <h2>{user.name} {user.surname}</h2>
                <p>email:</p>
                <p style={{ flexGrow: 1, fontWeight: 'bold'}}>{user.email}</p>
              </div>
              <div>
                  <div style={styles.dropdownContainer}>
                    <select
                      onChange={(e) => handleSelectChange(user.id, e.target.value)} // Передача userId и выбранного действия
                      style={styles.select}
                      defaultValue=""
                    >
                      <option value="" disabled>Выберите действие</option>
                      <option value="delete">Удалить</option>
                    </select>
                  </div>
                </div>
            </div>
          ))}
          <button
            onClick={handleClick}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              fontSize: '24px',
            }}
          >
            <FaPlus/>
          </button>
        </div>
      </div>
    </>
  );
}