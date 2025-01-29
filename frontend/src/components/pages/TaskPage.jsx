import React, { useEffect, useState } from 'react';
import { TaskLoader } from '../connection/loadTasks';
import { InputSubmit } from '../elements/InputSubmit';
import { postUserAnswer } from '../connection/postUserAnswer';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteTask } from '../connection/task/deleteTask';

export function TaskPage({ tasks, setTasks }) {
  const userId = JSON.parse(localStorage.getItem('user_id'));
  const userRole = localStorage.getItem('role');

  const { lesson_id } = useParams();
  const navigate = useNavigate();
  

  const [answers, setAnswers] = useState({}); // Хранилище для ответов
  const [errors, setErrors] = useState({}); // Хранилище для ошибок

  useEffect(() => {
    // Инициализация состояния ответов при загрузке задач
    const initialAnswers = {};
    tasks.forEach(task => {
      if (task.userAnswer) {
        initialAnswers[task.id] = task.userAnswer; // Устанавливаем существующий ответ
      }
    });
    setAnswers(initialAnswers);
  }, [tasks]);

  const handleInputChange = (event, taskId) => {
    const { value } = event.target;

    // Обновляем ответ для конкретного задания
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [taskId]: value,
    }));

    // Очищаем ошибку для конкретного задания
    setErrors(prevErrors => ({
      ...prevErrors,
      [taskId]: '',
    }));
  };

  const handleSubmit = async (event, taskId) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const answer = answers[taskId] || ''; // Получаем ответ для конкретного задания

    try {
      const statusCode = await postUserAnswer(answer, taskId, userId); // Вызов функции
      
      if (statusCode && statusCode != 201) {
        // Проверяем, существует ли responseData и его statusCode
        setErrors(prevErrors => ({
          ...prevErrors,
          [taskId]: 'Произошла ошибка при отправке данных на сервер:(', // Устанавливаем сообщение об ошибке для конкретного задания
          // [taskId]: responseData.data ? responseData.data.error : 'Произошла ошибка при отправке данных на сервер:(',
        }));
      } 
      else{
        window.location.reload();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных на сервер:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        [taskId]: 'Произошла ошибка при отправке данных на сервер. Пожалуйста, попробуйте еще раз.',
      }));
    }
  };

  function changeBorder(result) {
    if (result === 0) {
      return "#FF0000"; // Красный цвет для неправильного ответа
    } else if (result === 1) {
      return "#008000"; // Зеленый цвет для правильного ответа
    } else {
      return "#000000"; // Черный по умолчанию
    }
  }

  function setTextToLabel(userAnswer, rightAnswer) {
    return userAnswer 
      ? `Правильный ответ: ${rightAnswer}` 
      : 'Введите ваш ответ с большой буквы';
  }





  const handleSelectChange = (taskId, action) => {
    switch (action) {
      case 'edit':
        navigate(`/edit/task/${taskId}`); // Передача moduleId в путь редактирования
        break;
      case 'delete':
        if (window.confirm('Вы уверены, что хотите удалить это задание?')) {
          handleDelete(taskId); // Если пользователь подтвердил, вызываем handleDelete
          window.location.reload();
        }
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    navigate(`/add/task/${lesson_id}`); // Передача moduleId в путь редактирования
  };

  const handleDelete = async (taskId) => {
    try {
      const statusCode = await deleteTask(taskId); // Вызов функции
      
      if (statusCode && statusCode !== 200) {
        alert("Произошла ошибка при отправке данных на сервер.")
      } 
      else{
        alert("Задание успешно удалено");
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
      <TaskLoader setTasks={setTasks} />
      <div style={{ paddingBottom: '50px' }}>
        <h1>Задания урока</h1>
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
          {tasks.map((task) => (
            <div
              key={task.id} // Используем уникальный ID задания
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ padding: '10px', flex: '1' }}>
                <h2>{task.name}</h2>
                <h3>{task.description}</h3>

                {userRole !='"user"'  && ( // Проверяем, есть ли роль
                  <p>правильный ответ: {task.rightAnswer}</p>
                )}
                {userRole !== '"user"' && (
                  <div style={{ padding: '10px', marginBottom: '20px' }}>
                    <div style={styles.dropdownContainer}>
                      <select
                        onChange={(e) => handleSelectChange(task.id, e.target.value)} // Передача moduleId и выбранного действия
                        style={styles.select}
                        defaultValue=""
                      >
                        <option value="" disabled>Выберите действие</option>
                        <option value="edit">Редактировать</option>
                        <option value="delete">Удалить</option>
                      </select>
                    </div>
                  </div>
                )}

                {userRole==='"user"'  && ( // Проверяем, есть ли роль
                   <form id={`task-form-${task.id}`} onSubmit={(event) => handleSubmit(event, task.id)}>
                   <label style={{ display: 'block' }} htmlFor={`answer-${task.id}`}>
                     {setTextToLabel(task.userAnswer, task.rightAnswer)}
                   </label>
                   {errors[task.id] && <div style={{ color: 'red' }}>{errors[task.id]}</div>} {/* Ошибка для конкретного задания */}
                   <input
                     style={{
                       display: 'block',
                       margin: '0 auto',
                       marginTop: '10px',
                       height: '30px',
                       width: '500px',
                       fontSize: '16px',
                       border: `3px solid ${changeBorder(task.result)}`,
                     }} 
                     type="text" 
                     name="answer" 
                     id={`userAnswer-${task.id}`}
                     value={answers[task.id] || ''} // Получаем ответ для конкретного задания
                     onChange={(event) => handleInputChange(event, task.id)} // Обновляем состояние при изменении
                     disabled={!!task.userAnswer} // Делаем поле неактивным, если ответ уже есть
                   required/>
                   <InputSubmit userAnswer={task.userAnswer} />
                 </form>
                )}
              </div>
            </div>
          ))}
          {userRole !== '"user"' && (
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