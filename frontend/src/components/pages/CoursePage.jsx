import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../elements/Button';
import { CourseLoader } from '../connection/loadCourses';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { deleteCourse } from '../connection/course/deleteCourse';

export function CoursePage({ courses, setCourses, user_id, user_name, user_surname }) {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate(); // Инициализация navigate для навигации
  
  const handleSelectChange = (courseId, action) => {
    switch (action) {
      case 'modules':
        navigate(`/modules/${courseId}`); 
        break;
      case 'edit':
        navigate(`/edit/course/${courseId}`); 
        break;
      case 'access':
        navigate(`/access/course/${courseId}`); 
        break;
      case 'delete':
        if (window.confirm('Вы уверены, что хотите удалить этот курс?')) {
          handleDelete(courseId); // Если пользователь подтвердил, вызываем handleDelete
          window.location.reload();
        }
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    navigate(`/add/course`); // Передача moduleId в путь редактирования
  };

  const handleDelete = async (courseId) => {
    try {
      const statusCode = await deleteCourse(courseId); // Вызов функции
      
      if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.")
      } 
      else{
        alert("Курс успешно удалён");
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
    <CourseLoader setCourses={setCourses} user_id={user_id}/>
      <div style={{ paddingBottom: '50px' }}>
        <h1>{user_name === 0 ? "Наши курсы" : `Здравствуйте, ${user_name} ${user_surname}`}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', maxWidth: '1200px', justifyContent: 'center', margin: '0 auto' ,overflowY: 'auto'}}>
          {courses.map((course, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '300px', height: 'auto' }}>
              <h2>{course.name}</h2>
              <img src={course.image} style={{ border: "2px solid #000000", width: '100px', height: '100px', borderRadius: '5px' }} />
              <p>{course.description}</p>
              <h3>Учитель: {course.teacher_name} {course.teacher_surname}</h3>
              <p style={{marginTop: '20px'}}>Рейтинг:</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: star <= course.rating ? 'gold' : 'gray',
                        cursor: 'default',
                        fontSize: '24px', // размер звёздочек, можете изменить по желанию
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
              {userRole === '"user"' && (
                <div style={{ padding: '20px' }}>
                  <Link to={`/modules/${course.id}`}>
                    <Button text='Перейти к модулям' backgroundColor="#4CAF50" hoverColor="#45a049" />
                  </Link>
                </div>
              )}
              {userRole === '"admin"' && (
                <div style={{ padding: '10px', marginBottom: '20px' }}>
                  <div style={styles.dropdownContainer}>
                    <select
                      onChange={(e) => handleSelectChange(course.id, e.target.value)} 
                      style={styles.select}
                      defaultValue=""
                    >
                      <option value="" disabled>Выберите действие</option>
                      <option value="modules">Перейти к модулям</option>
                      <option value="access">Доступ к курсу</option>
                      <option value="edit">Редактировать</option>
                      <option value="delete">Удалить</option>
                    </select>
                  </div>
                </div>
              )}
              {userRole === '"teacher"' && (
                <div style={{ padding: '10px', marginBottom: '20px' }}>
                  <div style={styles.dropdownContainer}>
                    <select
                      onChange={(e) => handleSelectChange(course.id, e.target.value)} 
                      style={styles.select}
                      defaultValue=""
                    >
                      <option value="" disabled>Выберите действие</option>
                      <option value="modules">Перейти к модулям</option>
                      <option value="access">Доступ к курсу</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
          {userRole === '"admin"' && (
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
          )}
        </div>
      </div>
    </>
  );
}